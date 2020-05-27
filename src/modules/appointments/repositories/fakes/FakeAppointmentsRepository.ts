import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import { uuid } from 'uuidv4';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IAppointmentsRepostory from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepostory {
  private appointments: Appointment[] = [];

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

    return findAppointment;
  }

  async findAllInMonthFromProvider(
    { provider_id, month, year }: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id
        && getMonth(appointment.date) + 1 === month
        && getYear(appointment.date) === year,
    );

    return appointments;
  }

  async findAllInDayFromProvider(
    { provider_id, day, month, year }: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id
        && getDate(appointment.date) === day
        && getMonth(appointment.date) + 1 === month
        && getYear(appointment.date) === year,
    );

    return appointments;
  }

  async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
