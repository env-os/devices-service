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

    public async getAll(): Promise<Command[]> {
        return await this.repository.find()
    }

    public async getOneByUuid(uuid: string): Promise<Command> {
        return await this.repository.findOneOrFail({
            where: {uuid: uuid},
            relations: ['device'],
        })
    }
}