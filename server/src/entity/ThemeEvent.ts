import {
  Entity, Column, BaseEntity, ManyToMany, JoinTable,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Team from './Team';
import User from './User';
import Theme from './theme';
import Event from './Event';

@ObjectType()
@Entity('themeevent')
export default class ThemeEvent extends BaseEntity {
  @ManyToMany(() => Theme, (theme) => theme.themeEvent)
  @JoinTable()
  theme:Theme[]

  @ManyToMany(() => Event, (theme) => theme.themeEvent)
  @JoinTable()
  event:Event[]
}
