import { EntityRepository, AbstractRepository } from "typeorm";
import { Command } from "../entities/command.entity";

@EntityRepository(Command)
export class CommandRepository extends AbstractRepository<Command> {

    public async create(command: Command): Promise<void> {
        await this.repository.save(command);
    }

    public async delete(command: Command): Promise<void> {
        await this.repository.remove(command);
    }

    public async getAll(): Promise<Command[] | undefined> {
        return await this.repository.find()
    }

    public async getOneByUuid(uuid: string): Promise<Command | undefined> {
        return await this.repository.findOne({
            where: {uuid: uuid},
            join: {
                alias: "command",
                leftJoinAndSelect: {
                    devices: "command.device",
                }
            },
        })
    }
}