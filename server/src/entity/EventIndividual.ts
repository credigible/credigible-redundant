import {
  Entity, Column, BaseEntity, ManyToMany, JoinTable,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Event from './Event';
import User from './User';

@ObjectType()
@Entity('eventindividual')
export default class EventIndividual extends BaseEntity {
  @ManyToMany(() => User, (user) => user.eventIndividual)
  @JoinTable()
  user:User[]

  @ManyToMany(() => Event, (event) => event.eventIndividual)
  @JoinTable()
  event:Event[]

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  timeStamp : Date
}
