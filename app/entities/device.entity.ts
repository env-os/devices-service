import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('Devices')
export class Device {
    @PrimaryColumn('uuid')
    public uuid: string;

    @Column({ type:'varchar', length: 150 })
    public name: string;

    @Column({ type: 'varchar', length: 17, unique: true })
    public macaddress: string;

    @Column({ type: 'text', nullable: true})
    public description: string;

    constructor(uuid: string, name: string, macaddress: string, description: string){
        this.uuid = uuid;
        this.name = name;
        this.macaddress = macaddress;
        this.description = description;
    }
}
