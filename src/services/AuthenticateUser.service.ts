import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import User from '../models/User.model';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: Request): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('O email ou senha são inválidos!');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('O email ou senha são inválidos!');
    }

    const token = sign({}, '6a693bdc4cc4ce589ca1327bca29968e', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
