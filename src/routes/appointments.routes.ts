import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/Appointments.repository';
import CreateAppointmentService from '../services/CreateAppointment.service';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    return response.json(appointment);
  } catch (err) {
    return response.status(422).json({ error: err.message });
  }
});

export default appointmentsRouter;
