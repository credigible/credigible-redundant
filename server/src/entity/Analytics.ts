import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IsEmail, validateOrReject } from 'class-validator';
import logger from '../utils/logger';

/* eslint-disable import/prefer-default-export */
@ObjectType()
@Entity('comingSoon')
export class ComingSoon extends BaseEntity {
  // idek why, but something tells me we might need it
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  // @BeforeInsert()
  // @BeforeUpdate()
  // async validate() {
  // await validateOrReject(this);
  // }
}
/* eslint-enable import/prefer-default-export */
