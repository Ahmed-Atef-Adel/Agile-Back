
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('user_attachments') 
export class UserAttach {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: "user_id" })
  user_id: User;


  @Column({ length: 500 }) 
  file_path: string;

  @Column({ nullable: true })
  birth_certificate: string; 

  @Column({ nullable: true })
  military_certificate: string; 

  @Column({ nullable: true})
  national_id: number; // National ID Number

  @Column({ nullable: true})
  bank_account: number; // Bank Account Number

  @Column({ nullable: true})
  address: string; 

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
