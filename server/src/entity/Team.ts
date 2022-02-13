import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { EventTeam, UserTeam } from './ManytoMany';

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

  @OneToMany(() => UserTeam, (userTeam) => userTeam.team)
  userTeam :UserTeam[]

  @OneToMany(() => EventTeam, (eventTeam) => eventTeam.team)
  eventTeam :EventTeam[]
}
