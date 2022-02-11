import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import ThemeEvent from './ThemeEvent';

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

    @ManyToMany(() => ThemeEvent, (themeEvent) => themeEvent.theme)
    themeEvent:ThemeEvent[]
}
