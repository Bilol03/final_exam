import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Course } from 'src/course/entities/course.entity';
import { Lessons } from 'src/lessons/entities/lesson.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;

  @ManyToOne(() => Course, (course) => course.modules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' }) // optional: if you want explicit column
  course: Course;

  @OneToMany(() => Lessons, (lesson) => lesson.module)
  lessons: Lessons[];
  @OneToMany(() => Assignment, (assignment) => assignment.module) 
  assignments: Assignment[];

  @Column({nullable: false})
  courseId: number;
}
