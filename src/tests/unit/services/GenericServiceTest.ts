import { Car } from "../../../interfaces/CarInterface";
import ModelTest from "../models/GenericModelTest";
import GenericService from '../../../services/GenericService';

class GenericServiceTest extends GenericService<Car> {
  constructor(model = new ModelTest()) {
    super(model);
  }
}

export default GenericServiceTest;