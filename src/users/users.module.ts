import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersTypeormRepositoryService } from './users-typeorm-repository.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, {
    provide: 'usersRepository',
    useClass: UsersTypeormRepositoryService
  }]
})
export class UsersModule {}
