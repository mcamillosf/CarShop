import { Router } from 'express';
import GenericController from '../controllers/GenericController';
import validate from '../middlewares/validateInput';

const motorcycles = '/motorcycles/:id';

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
    this.router.get(motorcycles, controller.readOne);
    this.router.post('/motorcycles', validate, controller.create);
    this.router.put(motorcycles, controller.update);
    this.router.delete(motorcycles, controller.delete);
  }
}

export default MotorCycleRouter;
