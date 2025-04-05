
import { Department } from "src/departments/entities/department.entity";
import { Message } from "src/message/entities/message.entity";
import { Project } from "src/project/entities/project.entity";
import { ProjectUser } from "src/project_user/entities/project_user.entity";
import { Rate } from "src/rate/entities/rate.entity";
import { UserTask } from "src/user-tasks/entities/user-task.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserGender {
  Male = 'male',
  Female = 'female',
}
export enum UserRole {
  Manager = 'manager',
  Developer = 'developer',
  Tester = 'tester',
  Designer = 'designer',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Department, department => department.id)
    @JoinColumn({ name: "department_id"})
    department_id: Department;
    
    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @Column({unique: true})
    email: string;
    
    @Column({type: 'enum', enum:UserGender, default:UserGender.Male})
    gender: UserGender;

    @Column()
    birth_date: Date;

    @Column({ default: false })
    is_active: boolean;

    @Column({ default: '' })
    profile: string;

    @Column()
    rate: number;

    @Column({nullable: true})
    accessToken: string;
    
    @Column({ type: 'enum', enum: UserRole, default: UserRole.Developer})
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(()=> ProjectUser, projectUser => projectUser.user_id)
    projectUsers: ProjectUser[];

    @OneToMany(()=> UserTask, userTask => userTask.user_id)
    userTasks: UserTask[];

    @OneToMany(()=> Rate, rate => rate.user_id)
    userRate: Rate[];

    @OneToMany(()=> Rate, rate => rate.rated_by_id)
    usersRatedByUser: Rate[];

    @OneToMany(()=> Message, message => message.sender_id)
    messageSend: Message[];

    @OneToMany(()=> Message, message => message.receiver_id)
    messageReceived: Message[];

    @OneToOne(()=> Project, project => project.client_id)
    project: Project;
}
