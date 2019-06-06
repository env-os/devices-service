import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CommandRepository as CommandRepository } from '../repositories/command.repository';
import { Command } from '../entities/command.entity';
import { CommandDto } from '../dto/command.dto';
import { DeviceRepository } from '../repositories/device.repository';

Service()
export class CommandService {
    constructor(
        @InjectRepository()
        private readonly commandRepository: CommandRepository,
        private readonly deviceRepository: DeviceRepository,
    ) {}

    async create(commandDto: CommandDto){
        await this.commandRepository.create(new Command(
            commandDto.uuid,
            commandDto.name,
            commandDto.description,
            commandDto.device
        ));
    }

    public async delete(commandSlug: string): Promise<void> {
        await this.commandRepository.getOneBySlug(commandSlug)
        .then((command) => {
            if(command != null){
                this.commandRepository.delete(command);
            }
        })
    }

    public async getAll(): Promise<Command[] | undefined> {
        return await this.commandRepository.getAll()
    }

    public async getOneBySlug(commandSlug: string): Promise<Command | undefined> {
        return await this.commandRepository.getOneBySlug(commandSlug);
    }
}