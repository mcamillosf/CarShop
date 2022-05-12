import { Schema, model as createModel, Document } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import GenericModel from './GenericModel';

interface MotorcycleDocument extends Motorcycle, Document { }

const MotorcycleSchema = new Schema<MotorcycleDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  category: { type: String, required: true },
  engineCapacity: { type: Number, required: true },  
}, { versionKey: false });

class MotorcycleModel extends GenericModel<Motorcycle> {
  constructor(model = createModel('Motorcycles', MotorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
