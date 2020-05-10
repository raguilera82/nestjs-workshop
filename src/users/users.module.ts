import { Module } from '@nestjs/common';
import { UsersInmemoryRepositoryService } from './users-inmemory-repository.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, {
    provide: 'usersRepository',
    useClass: UsersInmemoryRepositoryService
  }]
})
export class UsersModule {}
