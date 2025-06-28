import { Exclude } from 'class-transformer';
import { Course } from 'src/course/entities/course.entity';
import { Enrollment } from 'src/course/entities/enroll.entity';
import { UserRole } from 'src/enums/roles.enum';
import { Result } from 'src/results/entities/result.entity';
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

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
