import { isEqual } from 'date-fns';

import Appointment from '../models/Appointment.model';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  all(): Appointment[] {
    return this.appointments;
  }

  findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

    return findAppointment || null;
  }

  create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
