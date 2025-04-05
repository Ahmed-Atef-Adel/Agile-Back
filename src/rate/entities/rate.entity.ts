import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Rate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User, user => user.id)
    @JoinColumn({name: "user_id"})
    user_id: User;

    @ManyToOne(()=> User, user => user.id)
    @JoinColumn({name: "rated_by_id"})
    rated_by_id: User;
    
    @Column()
    rate: number;
    
    @Column()
    month: Date;
    
    @Column()
    year: Date;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
