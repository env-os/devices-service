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
            deviceDto.uuid,
            deviceDto.name,
            deviceDto.macaddress,
            deviceDto.topic,
            deviceDto.description,
            deviceDto.commands,
        ));
    }

    async delete(uuid: string): Promise<void> {
        await this.deviceRepository.getOneByUuid(uuid)
        .then((device) => this.deviceRepository.delete(device));
    }

    public async getOneByUuid(uuid: string): Promise<Device> {
        return await this.deviceRepository.getOneByUuid(uuid);
    }

    public async getAll(): Promise<Device[]> {
        return await this.deviceRepository.getAll();
    }
}