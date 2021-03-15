import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
  async create (request: Request, response: Response) {
    const { name, email } = request.body;

    // validacao dos campos (name, email) com o yup
    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email().required("E-mail incorreto")
    })

    // caso não seja válido algum(s) campo(s)
    try {
      await schema.validate(request.body, {abortEarly: false});
    } catch (err) {
      throw new AppError(err);
    }
        
    // Repositório -> permite ações no banco de dados
    const userRepository = getCustomRepository(UsersRepository);

    // Verificar se já existe um usuário cadastrado com este e-mail
    // Como se fosse uma query: SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    // findOne -> retorna 1 registro
    const userAlredyExists = await userRepository.findOne({
      email
    });

    if(userAlredyExists) {
      throw new AppError("User alredy exists!");
    }

    // Criação de usuário
    const user = userRepository.create({
      name, email
    })
    await userRepository.save(user);
    return response.status(201).json(user);
  }
}

export { UserController };
