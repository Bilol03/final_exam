import { UserRole } from "src/enums/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string
    @Column({unique: true})
    email: string
    @Column()
    password: string
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.student
    })
    role: UserRole
}
