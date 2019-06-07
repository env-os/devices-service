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
    ) {}

    async create(commandDto: CommandDto){
        await this.commandRepository.create(new Command(
            commandDto.uuid,
            commandDto.name,
            commandDto.description,
            commandDto.device
        ));
    }

    public async delete(commandUuid: string): Promise<void> {
        await this.commandRepository.getOneByUuid(commandUuid)
        .then((command) => {
            if(command != null){
                this.commandRepository.delete(command);
            }
        })
    }

    public async getAll(): Promise<Command[]> {
        return await this.commandRepository.getAll()
    }

    public async getOneByUuid(commandUuid: string): Promise<Command> {
        return await this.commandRepository.getOneByUuid(commandUuid);
    }
}