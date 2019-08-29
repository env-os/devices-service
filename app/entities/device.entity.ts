import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Command } from "./command.entity"

@Entity('Devices')
export class Device {
    @PrimaryColumn('uuid')
    public uuid: string;

    @Column({ type:'varchar', length: 150 })
    public name: string;

    @Column({ type:'varchar', length: 500, unique: true })
    public topic: string;

    @Column({ type: 'varchar', length: 17, unique: true })
    public macaddress: string;

    @Column({ type: 'text', nullable: true})
    public description: string;

    @Column({ type: 'double precision'})
    public valmax: number;

    @Column({ type: 'double precision'})
    public valmin: number;

    @OneToMany(type => Command, command => command.device)
    public commands: Command[];

    constructor(uuid: string, name: string, macaddress: string, topic: string, description: string, valmax: number, valmin: number, commands: Command[]){
        this.uuid = uuid;
        this.name = name;
        this.macaddress = macaddress;
        this.topic = topic;
        this.description = description;
        this.valmax = valmax;
        this.valmin = valmin;
        this.commands = commands;
    }
}
