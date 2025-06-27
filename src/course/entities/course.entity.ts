import { Modules } from 'src/module/entities/module.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column()
  level: string

  @Column()
  category: string

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'teacherId' }) // optional: explicit column name
  teacher: User;

  @OneToMany(() => Modules, (module) => module.course)
  modules: Modules[];

  @Column()
  teacherId: number;
}
