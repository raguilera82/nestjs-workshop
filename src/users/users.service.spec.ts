import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users', () => {
    const user = {
      name: 'Ruben'
    }
    service.newUser(user);
    expect(service.getAllUsers().length).toBe(1);
  })

  it('should get user by id', () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = service.newUser(user);
    const userById = service.getUserById(newUser.id);
    expect(userById).toBeDefined();
  })

  it('should new user', () => {
    const actualSize = service.getAllUsers().length;
    const user = {
      id: '2',
      name: 'Mateo'
    }
    const newUser = service.newUser(user);
    expect(newUser).toBe(newUser);
    const postSize = service.getAllUsers().length;
    expect(postSize).toBe(actualSize + 1);
  })

  it('should update user', () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = service.newUser(user);
    const updateUser = {
      id: newUser.id,
      name: 'Ruben Aguilera'
    }
    service.updateUser(updateUser.id, updateUser);
    expect(user.name).not.toEqual(updateUser.name);

  })

  it('should delete user', () => {
    const user = {
      name: 'Ruben'
    }
    const newUser = service.newUser(user);
    const actualSize = service.getAllUsers().length;
    service.deleteUser(newUser.id);
    const postDeleteSize = service.getAllUsers().length;
    expect(postDeleteSize).toBe(actualSize - 1);
  })

});
