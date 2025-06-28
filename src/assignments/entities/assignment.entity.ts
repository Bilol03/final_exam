import { Modules } from "src/module/entities/module.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    moduleId: number;
}
