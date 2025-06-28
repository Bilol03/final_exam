import { Modules } from "src/module/entities/module.entity";
import { Result } from "src/results/entities/result.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;

    @ManyToOne(() => Modules, (module) => module.assignments, {onDelete: 'CASCADE'})
    @JoinTable({name: 'moduleId'})
    module: Modules;

    @OneToMany(() => Result, (result) => result.assignment)
    results: Result[];
    @Column()
    moduleId: number;
}
