import { Car, CarSchema } from '../interfaces/CarInterface';
import GenericService, { ServiceError } from './GenericService';
import CarModel from '../models/CarModel';

class CarService extends GenericService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }
  
  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const { error } = CarSchema.validate(obj);
    if (error) {
      throw error;
    }
    return this.model.create(obj);
  };
}

export default CarService;
