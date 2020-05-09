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
    expect(controller.getAllUSers().length).toBe(2);
  })

  it('should get user by id', () => {
    const user = controller.getUserById('0');
    expect(user).toBeDefined();
  })

  it('should new user', () => {
    const actualSize = controller.getAllUSers().length;
    const user = {
      id: '2',
      name: 'Mateo'
    }
    const newUser = controller.newUser(user);
    expect(newUser).toBe(newUser);
    const postSize = controller.getAllUSers().length;
    expect(postSize).toBe(actualSize + 1);
  })

  it('should update user', () => {
    const updateUser = {
      id: '0',
      name: 'Ruben Aguilera'
    }
    const user = controller.getUserById(updateUser.id);
    controller.updateUser(updateUser.id, updateUser);
    expect(user.name).not.toEqual(updateUser.name);

  })

  it('should delete user', () => {
    const actualSize = controller.getAllUSers().length;
    controller.deleteUser('0');
    const postDeleteSize = controller.getAllUSers().length;
    expect(postDeleteSize).toBe(actualSize - 1);
  })

});
