import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  async execute({
    user_id, name, email, password, old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado!');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail já está em uso!');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Você precisa informar a senha anterior para que possa definir uma nova senha!');
    }


    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha anterior não confere!');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.cacheProvider.invalidatePrefix(`providers-list:${ user_id }`);
    await this.cacheProvider.invalidatePrefix(`provider-appointments:${ user_id }`);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
