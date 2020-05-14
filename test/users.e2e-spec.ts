import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDTO } from 'src/users/user.dto';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersModule } from '../src/users/users.module';
import { TypeORMExceptionFilter } from './../src/filters/typeorm-exceptions.filter';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new TypeORMExceptionFilter());
    await app.init();
  });

  it('users CRUD', async (done) => {

    const server = request(app.getHttpServer());

    const currentGetAllRequest = await server.get('/users').expect(200);
    const currentSize = currentGetAllRequest.body.length;

    const newUser: UserDTO = {
      name: 'Mateo'
    }
    const newUserRequest = await server.post('/users').type('form')
    .send(newUser).expect(201);
    expect(newUserRequest.body.name).toBe(newUser.name);
    const postNewRequest = await server.get('/users').expect(200);
    const postNewSize = postNewRequest.body.length;
    expect(postNewSize).toBe(currentSize + 1);

    await server.post('/users').type('form')
    .send(newUser).expect(400);

    const id = newUserRequest.body.id;
    const getUserByIdRequest = await server.get(`/users/${id}`).expect(200);
    expect(getUserByIdRequest.body.id).toBe(id);

    const updateUser: UserDTO = {
      id: newUserRequest.body.id,
      name: 'Mateo Aguilera'
    }
    const updateUserRequest = await server.put(`/users/${newUserRequest.body.id}`)
    .expect(200).type('form').send(updateUser);
    expect(updateUserRequest.body.name).toEqual(updateUser.name);

    await server.delete(`/users/${updateUser.id}`)
    .expect(200);
    const postDeleteGetAllRequest = await server.get('/users')
    .expect(200);
    const postDeleteSize = postDeleteGetAllRequest.body.length;
    expect(postDeleteSize).toBe(currentSize);

    done();

  });
});
