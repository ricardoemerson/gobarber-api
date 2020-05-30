import { getDaysInMonth, getDate } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

interface IReponse {
  day: number;
  available: boolean;
}

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepostory: IAppointmentsRepository,
  ) { }

  async execute({ provider_id, year, month }: IRequest): Promise<IReponse[]> {
    const appointments = await this.appointmentsRepostory.findAllInMonthFromProvider({ provider_id, month, year });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1);

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => getDate(appointment.date) === day);

      return { day, available: appointmentsInDay.length < 10 };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
