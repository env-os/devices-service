import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {DeviceRepository} from "../repositories/device.repository"

@Service()
export class DeviceService {
    constructor(
        @InjectRepository()
        private readonly devices: DeviceRepository,
    ) {}
}