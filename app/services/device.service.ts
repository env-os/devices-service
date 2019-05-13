import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {DeviceRepository} from "../repositories/device.repository"
import {Device} from '../entities/device.entity';
import { DeviceDto } from '../dto/device.dto'

@Service()
export class DeviceService {
    constructor(
        @InjectRepository()
        private readonly devices: DeviceRepository,
    ) {}

    async create(deviceDto: DeviceDto){
        await this.devices.save(new Device(
            deviceDto.name,
            deviceDto.macaddress,
            deviceDto.description
        ))
    }

    async delete(id: number){
        await this.devices.delete({
            id: id
        });
    }

    async getAll(): Promise<Device[]>{
        return await this.devices.find();
    }

    async getOneById(id: number): Promise<Device>{
        return await this.devices.getOneById(id)
    }
}