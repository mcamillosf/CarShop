import { Car } from "../../../interfaces/CarInterface";
import ServiceTest from "../services/GenericServiceTest";
import GenericController from '../../../controllers/GenericController';

class GenericControllerTest extends GenericController<Car> {
  constructor(model = new ServiceTest()) {
    super(model);
  }
}

export default GenericControllerTest;
