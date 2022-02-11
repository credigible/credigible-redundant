import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import UserTeam from './UserTeam';
import EventTeam from './EventTeam';

@ObjectType()
@Entity('team')
export default class Team extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  teamName: string

  @Field()
  @Column({
    default: false,
  })
  sameInstitution:Boolean

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  created: Date

  @ManyToMany(() => UserTeam, (userTeam) => userTeam.team)
  userTeam :UserTeam[]

  @ManyToMany(() => EventTeam, (eventTeam) => eventTeam.team)
  eventTeam :EventTeam[]
}
