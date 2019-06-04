import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {DeviceRepository} from "../repositories/device.repository"
import {Device} from '../entities/device.entity';
import { DeviceDto } from '../dto/device.dto'

@Service()
export class DeviceService {
    constructor(
        @InjectRepository()
        private readonly deviceRepository: DeviceRepository,
    ) {}

    async create(deviceDto: DeviceDto): Promise<void> {
        await this.deviceRepository.create(new Device(
            deviceDto.name,
            deviceDto.macaddress,
            deviceDto.description,
        ));
    }

    async delete(deviceSlug: string){
        await this.deviceRepository.getOneBySlug(deviceSlug)
        .then((device) => {
            if(device != null){
                this.deviceRepository.delete(device);
            }
        })
    }

    public async getOneBySlug(deviceSlug: string): Promise<Device | undefined> {
        return await this.deviceRepository.getOneBySlug(deviceSlug);
    }

    public async getAll(): Promise<Device[]> {
        return await this.deviceRepository.getAll();
    }
}