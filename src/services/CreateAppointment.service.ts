import { getCustomRepository } from 'typeorm';

import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment.model';
import AppointmentsRepository from '../repositories/Appointments.repository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('Horário de agendamento indisponível.');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
