import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('O e-mail informado já está sendo utilizado!');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({ name, email, password: hashedPassword });
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
