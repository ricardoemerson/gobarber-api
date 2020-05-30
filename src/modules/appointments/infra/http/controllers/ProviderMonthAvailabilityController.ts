import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '../../../services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;
    console.log('request.body: ', request.body);

    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderMonthAvailability.execute({ provider_id, month, year });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
