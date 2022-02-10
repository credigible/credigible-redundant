import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

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
    default: () => new Date(Date.now()),
  })
  userCreated: Date;

  @Column({
    default: () => new Date(Date.now()),
  })
  lastLogin: Date;

  @Field()
  @Column()
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
}
