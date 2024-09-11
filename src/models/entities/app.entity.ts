/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

@Entity({ name: 'users' })
export class AppEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    version: string;

}