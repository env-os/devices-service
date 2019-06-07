import { Entity, Column, OneToOne, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { Device } from "./device.entity";

@Entity('Commands')
export class Command {
    @PrimaryColumn("uuid")
    public uuid: string;

    @Column({ type: 'varchar', length: 150})
    public name: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    public description: string;

    @ManyToOne(type => Device, device => device.commands, {onDelete: 'CASCADE'})
    device: Device;

    constructor(uuid: string, name: string, description: string, device: Device){
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.device=device;
    }
}