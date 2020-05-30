import { getHours, isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

interface IReponse {
  hour: number;
  available: boolean;
}

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepostory: IAppointmentsRepository,
  ) { }

  async execute({ provider_id, year, month, day }: IRequest): Promise<IReponse[]> {
    const appointments = await this.appointmentsRepostory.findAllInDayFromProvider({ provider_id, year, month, day });

    const hourStart = 8;

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart);

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => getHours(appointment.date) === hour);

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
