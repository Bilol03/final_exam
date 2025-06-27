import { Exclude } from 'class-transformer';
import { UserRole } from 'src/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  @Exclude()
  password: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.student,
  })
  role: UserRole;
}
