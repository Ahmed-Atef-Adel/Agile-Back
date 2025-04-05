
import { Priority, Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
   
  @Column()
  story_point: number;
  
  @Column()
  priority: Priority;
      
  @CreateDateColumn()
  createdAt: Date;
     
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;
     
  @OneToMany(() => Task, (task) => task.userStory_id)
  tasks: Task[];
}
