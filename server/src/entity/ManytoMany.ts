import {
  Entity, Column, BaseEntity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Team from './Team';
import User from './User';
import Event from './Event';
import Theme from './theme';

@ObjectType()
@Entity('userteam')
class UserTeam extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Team, (team) => team.userTeam)
  team:Team

  @ManyToOne(() => User, (user) => user.userTeam)
  user:User

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
    createdAt: Date
}

@ObjectType()
@Entity('eventteam')
class EventTeam extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Team, (team) => team.eventTeam)
  team:Team

  @ManyToOne(() => Event, (event) => event.eventTeam)
  event:Event

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  createdAt: Date
}

@ObjectType()
@Entity('themeevent')
class ThemeEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Theme, (theme) => theme.themeEvent)
  theme:Theme

  @ManyToOne(() => Event, (theme) => theme.themeEvent)
  event:Event
}

@ObjectType()
@Entity('eventindividual')
class EventIndividual extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.eventIndividual)
  user:User

  @ManyToOne(() => Event, (event) => event.eventIndividual)
  event:Event

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  createdAt: Date
}

export {
  EventIndividual, EventTeam, UserTeam, ThemeEvent,
};
