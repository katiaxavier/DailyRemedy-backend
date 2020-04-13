import express from 'express';

import UserController from './app/controllers/UserController';
import RemedyController from './app/controllers/RemedyController';
import ProfileController from './app/controllers/ProfileController';
import SessionController from './app/controllers/SessionController';

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);

routes.put('/users', UserController.update);

routes.post('/remedys', RemedyController.store); 
routes.put('/remedys/:id', RemedyController.update);
routes.delete('/remedys/:id', RemedyController.delete);

routes.get('/profiles', ProfileController.show);

export default routes;