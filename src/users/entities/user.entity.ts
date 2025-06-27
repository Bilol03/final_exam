import { Exclude } from 'class-transformer';
import { Course } from 'src/course/entities/course.entity';
import { UserRole } from 'src/enums/roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];
}
