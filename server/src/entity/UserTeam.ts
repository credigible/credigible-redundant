import {
  Entity, Column, BaseEntity, ManyToMany, JoinTable,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Team from './Team';
import User from './User';

@ObjectType()
@Entity('userteam')
export default class UserTeam extends BaseEntity {
  @ManyToMany(() => Team, (team) => team.userTeam)
  @JoinTable()
  team:Team[]

  @ManyToMany(() => User, (user) => user.userTeam)
  @JoinTable()
  user:User[]

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  timeStamp : Date
}
