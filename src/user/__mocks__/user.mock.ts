import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 123,
  name: 'nameMock',
  email: 'exemplo@email.com',
  password: 'largepassword123',
  cpf: '12345678901',
  phone: '1234567890',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
