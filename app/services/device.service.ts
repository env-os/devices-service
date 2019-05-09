import { getManager } from "typeorm";
import { Device } from "../entities/device.entity";

export class DevicesService {
    async create (name: string, macaddress: string, description: string){
        const device = new Device(name, macaddress, description)
        
        let insert =  getManager().getRepository(Device).insert(device);
    }

    async delete(id: number) {
        await getManager().getRepository(Device).delete({
            id: id
        })
    }
    async getAll(): Promise<Device[]> {
        return await getManager().getRepository(Device).find();
    }
}