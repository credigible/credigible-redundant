import {
  Entity, Column, BaseEntity, ManyToMany, JoinTable,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Team from './Team';
import Event from './Event';

@ObjectType()
@Entity('eventteam')
export default class EventTeam extends BaseEntity {
  @ManyToMany(() => Team, (team) => team.eventTeam)
  @JoinTable()
  team:Team[]

  @ManyToMany(() => Event, (event) => event.eventTeam)
  @JoinTable()
  event:Event[]

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  timeStamp : Date
}
