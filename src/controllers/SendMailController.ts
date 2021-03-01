import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UserRepository";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlredyExists = await usersRepository.findOne({email});

    if (!userAlredyExists) {
      return response.status(400).json({
        error: "User doesnt exists"
      });
    }

    const surveysAlredyExists = await surveysRepository.findOne({ id: survey_id })
    // select where id = survey_id

    if (!surveysAlredyExists) {
      return response.status(400).json({
        error: "Survey doesnt exists!"
      });
    }

    // Salvar as informações na tabela surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: userAlredyExists.id,
      survey_id: surveysAlredyExists.id
    })

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);

    // Enviar e-mail para o usuário

  }
}

export { SendMailController }