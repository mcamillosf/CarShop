/* eslint-disable sonarjs/no-duplicate-string */
import { Router } from 'express';
import GenericController from '../controllers/GenericController';
import validate from '../middlewares/validateInput';

class MotorCycleRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: GenericController<T>,
    // route: string = controller.route,
  ) {
    this.router.get('/motorcycles', controller.read);
    this.router.get('/motorcycles/:id', controller.readOne);
    this.router.post('/motorcycles', validate, controller.create);
    this.router.put('/motorcycles/:id', controller.update);
    this.router.delete('/motorcycles/:id', controller.delete);
  }
}

export default MotorCycleRouter;
