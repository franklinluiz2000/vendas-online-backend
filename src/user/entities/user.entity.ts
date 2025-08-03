import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'phone', nullable: false })
  phone: string;

  @Column({ name: 'cpf', nullable: false, unique: true })
  cpf: string;

  @Column({ name: 'password', nullable: false })
  password: string;
}
