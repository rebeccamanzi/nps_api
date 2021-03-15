import { Request, Response } from "express";
import {resolve} from 'path'; // node
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({email});

    if (!user) {
      return response.status(400).json({
        error: "User doesnt exists"
      });
    }

    const survey = await surveysRepository.findOne({ id: survey_id })
    // select where id = survey_id

    if (!survey) {
      return response.status(400).json({
        error: "Survey doesnt exists!"
      });
    }

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlredyExists = await surveysUsersRepository.findOne({ 
      where: {user_id: user.id, value: null},
      relations: ["user", "survey"]
     });

     if (surveyUserAlredyExists) {
       variables.id = surveyUserAlredyExists.id;
       await SendMailService.execute(email, survey.title, variables, npsPath);
       return response.json(surveyUserAlredyExists);
     }

    // Salvar as informações na tabela surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id
    })
    await surveysUsersRepository.save(surveyUser);
    
    // Enviar e-mail para o usuário    
    variables.id = survey_id;
    await SendMailService.execute(email, survey.title, variables, npsPath);
    return response.json(surveyUser)
  }
}

export { SendMailController }