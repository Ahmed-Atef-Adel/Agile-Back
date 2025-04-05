import { Project } from './../../project/entities/project.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";

@Entity()
export class ProjectTaskStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Project, project => project.id)
     @JoinColumn({ name: "project_id"})
     project_id: Project;
    

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
