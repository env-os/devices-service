import { Repository, EntityRepository } from 'typeorm';
import { Device } from '../entities/device.entity';


@EntityRepository(Device)
export class DeviceRepository extends Repository<Device> {
    
    public getOneById(id: number): Promise<Device>{
        return this.findOneOrFail({ id })
    }
}