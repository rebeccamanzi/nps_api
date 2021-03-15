import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

  async execute(request: Request, response: Response) {
    // recebendo os valores através da rota
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // verificando se existe este usuário
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    // caso o usuário não exista, erro
    if (!surveyUser) {
      return response.status(400).json({
        error: "Survey User does not exists!"
      })
    }

    // caso o usuário exista, salvar o valor da nota que ele deu
    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);
    return response.json(surveyUser);
  }
}

export { AnswerController }