import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

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
}
