import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UsersTypeormRepositoryService } from './users-typeorm-repository.service';

describe('UsersTypeormRepositoryService', () => {
  let service: UsersTypeormRepositoryService;
  let repo: Repository<UserEntity>;

  const userEntity: UserEntity = new UserEntity();
  userEntity.id = '0';
  userEntity.name = 'Test';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: UsersTypeormRepositoryService,
        useClass: UsersTypeormRepositoryService
      }, {
        provide: getRepositoryToken(UserEntity),
        useClass: Repository
      }],
    }).compile();

    service = module.get<UsersTypeormRepositoryService>(UsersTypeormRepositoryService);
    repo = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users', async () => {
    jest.spyOn(repo, 'save').mockResolvedValueOnce(userEntity);
    jest.spyOn(repo, 'find').mockResolvedValueOnce([userEntity]);
    const user = {
      name: 'Ruben'
    }
    await service.newUser(user);
    expect((await service.getAllUsers()).length).toBe(1);

  })

   it('should get user by id', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(userEntity);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(userEntity);
    
    const user = {
      name: 'Ruben'
    }
    const newUser = await service.newUser(user);
    const userById = await service.getUserById(newUser.id);
    expect(userById).toBeDefined();
  })

  it('should new user', async () => {
    jest.spyOn(repo, 'find').mockResolvedValueOnce([userEntity]);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(userEntity);
    jest.spyOn(repo, 'find').mockResolvedValueOnce([userEntity, userEntity]);
    
    const actualSize = (await service.getAllUsers()).length;
    const user = {
      id: '2',
      name: 'Mateo'
    }
    const newUser = await service.newUser(user);
    expect(newUser).toBe(newUser);
    const postSize = (await service.getAllUsers()).length;
    expect(postSize).toBe(actualSize + 1);
  })

  it('should update user', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(userEntity);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(userEntity);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(userEntity);
    
    const user = {
      name: 'Ruben'
    }
    const newUser = await service.newUser(user);
    const updateUser = {
      id: newUser.id,
      name: 'Ruben Aguilera'
    }
    await service.updateUser(updateUser.id, updateUser);
    expect(user.name).not.toEqual(updateUser.name);

  })

  it('should delete user', async () => {
    jest.spyOn(repo, 'save').mockResolvedValueOnce(userEntity);
    jest.spyOn(repo, 'find').mockResolvedValueOnce([userEntity]);
    jest.spyOn(repo, 'delete').mockReturnThis();
    jest.spyOn(repo, 'find').mockResolvedValueOnce([]);

    const user = {
      name: 'Ruben'
    }
    const newUser = await service.newUser(user);
    const actualSize = (await service.getAllUsers()).length;
    service.deleteUser(newUser.id);
    const postDeleteSize = (await service.getAllUsers()).length;
    expect(postDeleteSize).toBe(actualSize - 1);
  })
  
});
