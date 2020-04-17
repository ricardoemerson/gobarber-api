import { Router } from 'express';

import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/Appointments.repository';
import CreateAppointmentService from '../services/CreateAppointment.service';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentsRepository);
    const appointment = createAppointment.execute({ provider, date: parsedDate });

    return response.json(appointment);
  } catch (err) {
    return response.status(422).json({ error: err.message });
  }
});

export default appointmentsRouter;
