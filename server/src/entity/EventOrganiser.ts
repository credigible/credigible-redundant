import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('eventOrganizer')
export default class EventOrganizer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({
      unique: true,
    })
    organizationName: string;

    @Column()
    address: string;

    @Field()
    @Column({
      nullable: true,
    })
    credit: string | null;

    @Field()
    @Column({
      nullable: true,
    })
    debit: string | null;

    @Field()
    @Column({
      nullable: true,
    })
    upi: string | null;

    @Column({
      type: 'datetime',
      default: () => 'NOW()',
    })
    lastLogin: Date;

    @Field()
    @Column({
      type: 'datetime',
      default: () => 'NOW()',
    })
    created: Date;

    @Column({
      nullable: true,
    })
    picture: string | null;

    @Field()
    @Column({
      nullable: true,
    })
    phoneNumber: string | null;

    @Field()
    @Column({
      unique: true,
    })
    email: string;

    @Column({
      unique: true,
    })
    state: string;

    @Field()
    @Column({
      default: false,
    })
    ban:boolean

    @Field()
    @Column({
      nullable: true,
    })
    premiumName:string | null
}
