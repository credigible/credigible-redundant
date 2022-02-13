import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Achievement from './Achievement';
import EventTeam from './EventTeam';
import EventIndividual from './EventIndividual';
import { ThemeEvent } from './ManytoMany';

@ObjectType()
@Entity('event')
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    unique: true,
  })
  name: string;

  @Column()
  address: string;

  @Field()
  @Column({
    default: false,
  })
  sameInstitute: boolean;

  @Field()
  @Column({
    default: 0,
    type: 'int',
  })
  ageUpper: number;

  @Field()
  @Column('int')
  ageLower: number;

  @Field()
  @Column({
    default: 0,
    type: 'int',
  })
  maxTeamSize: number;

  @Field()
  @Column({
    default: 0,
    type: 'int',
  })
  minTeamSize: number;

  @Field()
  @Column({
    default: false,
  })
  ban: boolean;

  @Field()
  @Column({
    nullable: true,
  })
  theme: string | null;

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  registrationBeginningDate: Date;

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  registrationEndDate: Date;

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  startingDate: Date;

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  endingDate: Date;

  @Field()
  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  resultDate: Date;

  // since nullable no default values
  @Field()
  @Column({
    nullable: true,
  })
  certificationDate: Date | null;

  @OneToOne(() => Achievement, (achievement) => achievement.event)
  achievement: Achievement

  @ManyToOne(() => EventTeam, (eventTeam) => eventTeam.event)
  eventTeam: EventTeam[]

  @ManyToOne(() => EventIndividual, (eventIndividual) => eventIndividual.event)
  eventIndividual:EventIndividual[]

  @ManyToOne(() => ThemeEvent, (themeEvent) => themeEvent.event)
  themeEvent: ThemeEvent[]
}
