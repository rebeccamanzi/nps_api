import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";

class SurveyController {

  // criar pesquisa
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveyRepository);
    
    const survey = surveysRepository.create({
      title,
      description
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  // listar todas as pesquisas
  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveyRepository);

    const all = await surveysRepository.find();

    return response.json(all);
  }
}

export { SurveyController }

// create() e find() são metodos do typeorm