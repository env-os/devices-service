import { Command } from "../entities/command.entity";

export class DeviceDto {
    readonly uuid!: string;
    readonly name!: string;
    readonly macaddress!: string;
    readonly topic!: string;
    readonly description!: string;  
    readonly valmax!: number;
    readonly valmin!: number;
    readonly commands!: Command[];
}