import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import User from './User';
import Event from './Event';

@ObjectType()
@Entity('achievement')
export default class Achievement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  logo : string

  @Field()
  @Column('int')
  position:number

  @Field()
  @Column({
    nullable: true,
  })
  description: string | null

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  timeStamp: Date

  @OneToOne(() => User, (user) => user.achievement)
  @JoinColumn()
  user: User

  // i think event is a more suitable field than event organiser(Events) but okay to change
  @OneToOne(() => Event, (event) => event.achievement)
  @JoinColumn()
  event:Event
}
