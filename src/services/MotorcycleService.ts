import { 
  Motorcycle, MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import GenericService, { ServiceError } from './GenericService';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends GenericService<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }
  
  create = async (obj: Motorcycle): 
  Promise<Motorcycle | ServiceError | null> => {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default MotorcycleService;
