import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';

describe('Controller tests', () => {


  const carService = new CarService();
  const carController = new CarController(carService);
  
    const objCreateMock = {
    model: 'Audi A3',
    year: 2016,
    color: 'Preto',
    status: true,
    buyValue: 80000,
    doorsQty: 4,
    seatsQty: 5,
  }

  const findMock = [{}]

  const objUpdateMock = {
    model: 'Carango',
    year: 2000,
    color: 'Branco',
    status: true,
    buyValue: 10000,
    doorsQty: 2,
    seatsQty: 2,
  }

  it('Testa o método create da função instanciada', async () => {
    Sinon.stub(Model, "create").resolves(objCreateMock)

    const resultTest = await carService.create(objCreateMock);

    expect(resultTest).to.be.equal(objCreateMock);
  });

  it('Testa o método read da função instanciada', async () => {
    Sinon.stub(Model, "find").resolves(findMock)

    const resultTest = await carService.read();
    expect(resultTest).to.be.an('array');
    expect(resultTest[0]).to.be.an('object');
  });

  it('Testa o método readOne da função instanciada', async () => {
    Sinon.stub(Model, "findOne").resolves({ _id: 1, ...objCreateMock })

    const resultTest = await carService.readOne('1');
    expect(resultTest).to.deep.equal({ _id: 1, ...objCreateMock });
  });

  it('Testa o método update da função instanciada', async () => {
    Sinon.stub(Model, "findOneAndUpdate").resolves({ _id: 5, ...objUpdateMock })

    const resultTest = await carService.update('5', objUpdateMock);
    expect(resultTest).to.deep.equal({ _id: 5, ...objUpdateMock });

  });

  it('Testa o método delete da função instanciada', async () => {
    Sinon.stub(Model, "findOneAndDelete").resolves()

    await carService.delete('1');
    const resultTest2 = await carService.readOne('1');
    expect(resultTest2).to.not.includes({ id: 1 });
  });

  after(function () {
    Sinon.restore();
  });
});