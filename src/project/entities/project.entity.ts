import { Message } from 'src/message/entities/message.entity';
import { ProjectDepartment } from 'src/project_departments/entities/project_department.entity';
import { ProjectTaskStatus } from 'src/project_task_status/entities/project_task_status.entity';
import { ProjectUser } from 'src/project_user/entities/project_user.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'client_id' })
  client_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

 
  @OneToMany(() => ProjectUser, (projectUser) => projectUser.project_id)
  projectUsers: ProjectUser[];

  @OneToMany(
    () => ProjectTaskStatus,
    (projectTaskStatus) => projectTaskStatus.project_id,
  )
  projectTaskStatus: ProjectTaskStatus[];

  @OneToMany(
    () => ProjectDepartment,
    (project_department) => project_department.project_id,
  )
  project_department: ProjectDepartment[];

  @OneToMany(() => Message, (message) => message.project_id)
  message: Message[];

}