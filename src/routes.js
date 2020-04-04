import express from 'express';

import UserController from './controllers/UserController';
import RemedyController from './controllers/RemedyController';
import ProfileController from './controllers/ProfileController';
import SessionController from './controllers/SessionController';

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/remedys', RemedyController.index); 
routes.post('/remedys', RemedyController.create); 
routes.delete('/remedys/:id', RemedyController.delete);

routes.get('/profile', ProfileController.index);



export default routes;