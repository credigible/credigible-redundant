import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToMany, JoinTable,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import Achievement from './Achievement';
import UserTeam from './UserTeam';
import EventIndividual from './EventIndividual';

@ObjectType()
@Entity('user')
export default class User extends BaseEntity {
  // Should not be a field, we don't want to share it mp
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  firstName: string | null;

  @Column({
    nullable: true,
  })
  lastName: string | null;

  @Field()
  @Column()
  userName: string;

  @Field()
  @Column({
    nullable: true,
  })
  age: number | null;

  // not sure about this one , tried SVGElement and HTMLElement but didnt worked
  @Column({
    nullable: true,
  })
  profilePicture: string | null;

  @Field()
  @Column({
    nullable: true,
  })
  phoneNumber: string | null;

  @Column({
    nullable: true,
  })
  educationalInstitute: string | null;

  @Column({
    nullable: true,
  })
  course: string | null;

  @Column({
    nullable: true,
  })
  state: string | null;

  @Field()
  @Column({
    default: false,
  })
  ban: boolean;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  userCreated: Date;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  lastLogin: Date;

  @Field()
  @Column('int')
  gender: number;

  @Field()
  @Column({
    nullable: true,
  })
  upi: string | null;

  @Field()
  @Column({
    nullable: true,
  })
  credit: string | null;

  @Field()
  @Column({
    nullable: true,
  })
  debit: string;

  @OneToOne(() => Achievement, (achievement) => achievement.user)
  achievement: Achievement

  @ManyToMany(() => UserTeam, (userTeam) => userTeam.user)
  userTeam:UserTeam[]

  @ManyToMany(() => EventIndividual, (eventIndividual) => eventIndividual.user)
  eventIndividual:EventIndividual[]
}
