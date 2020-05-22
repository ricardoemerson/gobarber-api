import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepostory from '@modules/appointments/repositories/IAppointmentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepostory from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepostory>('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton<IUsersRepostory>('UsersRepository', UsersRepository);
