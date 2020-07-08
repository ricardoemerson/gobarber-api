import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '../../../services/ListProvidersService';


class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ user_id });

    return response.json(classToClass(providers));
  }
}

export default ProvidersController;
