import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  body: string;
  @Column({ nullable: false, default: 0 })
  score: number;
  @Column()
  assignmentId: number;
  @Column()
  userId: number
  @ManyToOne(() => Assignment, (assignment) => assignment.results, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'assignmentId' })
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.results, {onDelete: 'CASCADE'})
  @JoinTable({name: 'userId'})
  user: User;
}
