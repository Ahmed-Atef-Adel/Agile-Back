import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { UserTask } from 'src/user-tasks/entities/user-task.entity';
import { ProjectTaskStatus } from 'src/project_task_status/entities/project_task_status.entity';

@Entity('user_bugs')
export class UserBug {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserTask, (userTask) => userTask.id)
    @JoinColumn({name: "userTask_id"})
    userTask_id: UserTask;

    @OneToOne(() => ProjectTaskStatus, projectTaskStatus => projectTaskStatus.id)
    @JoinColumn({ name: 'project_task_status_id' })
    project_task_status_id: ProjectTaskStatus;

    @Column()
    story_point: number;

    @Column()
    working_hours: number;

    @Column()
    priority: number;

    @Column()
    title: string;

    @Column()
    comment: string;

    @Column({ type: 'longtext' })
    description: string; 

    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;
}
