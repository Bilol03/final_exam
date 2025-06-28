import { Modules } from "src/module/entities/module.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lessons {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({nullable: true})
    content: string;
    @ManyToOne(() => Modules, (module) => module.lessons, {onDelete: 'CASCADE'})
    @JoinColumn( {name: 'moduleId'} )
    module: Modules;

    @Column()
    moduleId: number;

}
