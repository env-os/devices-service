import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import slugify from 'slugify';

@Entity('Devices')
export class Device {
    @PrimaryGeneratedColumn('uuid')
    public uuid!: string;

    @Column({ type:'varchar', length: 150, unique: true})
    public name: string;

    @Column({ type: 'varchar', length: 150, unique: true })
    public slug: string;

    @Column({ type: 'varchar', length: 17, unique: true })
    public macaddress: string;

    @Column({ type: 'text', nullable: true})
    public description: string;

    constructor(name: string, macaddress: string, description: string){
        this.name = name;
        this.slug = slugify(String(this.name), {lower: true});
        this.macaddress = macaddress;
        this.description = description;
    }
}
