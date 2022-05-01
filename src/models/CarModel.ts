import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import GenericModel from './GenericModel';

interface CarDocument extends Car, Document { }

const carSchema = new Schema<CarDocument>({
  _id: { type: String, required: false },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },  
}, { versionKey: false });

class CarModel extends GenericModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;
