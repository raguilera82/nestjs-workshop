import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all users', () => {
    const user = {
      name: 'Ruben'
    }
    controller.newUser(user);
    expect(controller.getAllUsers().length).toBe(1);
  })

  it('should get user by id', () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = controller.newUser(user);
    const userById = controller.getUserById(newUser.id);
    expect(userById).toBeDefined();
  })

  it('should new user', () => {
    const actualSize = controller.getAllUsers().length;
    const user = {
      id: '2',
      name: 'Mateo'
    }
    const newUser = controller.newUser(user);
    expect(newUser).toBe(newUser);
    const postSize = controller.getAllUsers().length;
    expect(postSize).toBe(actualSize + 1);
  })

  it('should update user', () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = controller.newUser(user);
    const updateUser = {
      id: newUser.id,
      name: 'Ruben Aguilera'
    }
    controller.updateUser(updateUser.id, updateUser);
    expect(user.name).not.toEqual(updateUser.name);

  })

  it('should delete user', () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = controller.newUser(user);
    const actualSize = controller.getAllUsers().length;
    controller.deleteUser(newUser.id);
    const postDeleteSize = controller.getAllUsers().length;
    expect(postDeleteSize).toBe(actualSize - 1);
  })

});
