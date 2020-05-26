import { injectable, inject } from 'tsyringe';

import User from '../../users/infra/typeorm/entities/User';
import IUsersRepository from '../../users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({ except_user_id: user_id });

    return users;
  }
}

export default ListProvidersService;
