import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import ModelTest from './ModelTest';

describe('Model tests', () => {
  const mongoModelTest = new ModelTest();
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

  it('Testa se existe uma classe chamada MongoModel com os métodos esperados', async () => {

    expect(mongoModelTest).to.include.keys("create", "read", "readOne", "update", "delete");
  });

  it('Testa o método create da função instanciada', async () => {
    Sinon.stub(Model, "create").resolves(objCreateMock)

    const resultTest = await mongoModelTest.create(objCreateMock);
    expect(resultTest).to.deep.equal(objCreateMock);
  });

  it('Testa o método read da função instanciada', async () => {
    Sinon.stub(Model, "find").resolves(findMock)

    const resultTest = await mongoModelTest.read();
    expect(resultTest).to.be.an('array');
    expect(resultTest[0]).to.be.an('object');
  });

  it('Testa o método readOne da função instanciada', async () => {
    Sinon.stub(Model, "findOne").resolves({ _id: 1, ...objCreateMock })

    const resultTest = await mongoModelTest.readOne('1');
    expect(resultTest).to.deep.equal({ _id: 1, ...objCreateMock });
  });

  it('Testa o método update da função instanciada', async () => {
    Sinon.stub(Model, "findOneAndUpdate").resolves({ _id: 5, ...objUpdateMock })

    const resultTest = await mongoModelTest.update('5', objUpdateMock);
    expect(resultTest).to.deep.equal({ _id: 5, ...objUpdateMock });
  });

  it('Testa o método delete da função instanciada', async () => {
    Sinon.stub(Model, "findOneAndDelete").resolves()

    await mongoModelTest.delete('1');
    const resultTest2 = await mongoModelTest.readOne('1');
    expect(resultTest2).to.not.includes({ id: 1 });
  });

  after(function () {
    Sinon.restore();
  });

});