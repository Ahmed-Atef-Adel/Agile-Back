import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'sender_id' })
    sender_id:number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'receiver_id' })
    receiver_id: number

    @ManyToOne(() => Project, (project) => project.id)
    @JoinColumn({ name: 'project_id' })
    project_id: number

    @Column()
    message:string

    @Column({default: false})
    seen: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt:Date
}
