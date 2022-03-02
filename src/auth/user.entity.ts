import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { userRole } from './user.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: userRole;
}
