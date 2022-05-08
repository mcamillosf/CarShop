import { CarSchema, Car } from "../../../interfaces/CarInterface";
import MongoModelTest from "../models/ModelTest";
import GenericService, { ServiceError } from '../../../services/GenericService';

class CarServiceTest extends GenericService<Car> {
  constructor(model = new MongoModelTest()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  public async update(id: string, obj: Car): 
  Promise<Car | null | ServiceError> {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) return { error: parsed.error };
    return this.model.update(id, obj);
  }
}

export default CarServiceTest;