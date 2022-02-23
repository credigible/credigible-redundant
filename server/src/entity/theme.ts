import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { ThemeEvent } from './ManytoMany';

@ObjectType()
@Entity('theme')
export default class Theme extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({
      unique: true,
    })
    name: string;

    @OneToMany(() => ThemeEvent, (themeEvent) => themeEvent.theme)
    themeEvent:ThemeEvent[]
}
