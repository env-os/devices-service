import { Post, JsonController, Body, Get, Res, Param, Delete, OnUndefined, Req, BadRequestError, NotFoundError } from 'routing-controllers';
import { CommandService } from '../services/command.service';
import { CommandDto } from '../dto/command.dto';
import { Command } from '../entities/command.entity';
import { Request } from 'express'
import { LogsUtil } from '../utils/logs.util'
import { Device } from '../entities/device.entity';


@JsonController('/commands')
export class CommandController {
    constructor(private readonly commandService: CommandService) {}

    @Post()
    @OnUndefined(201)
    async create(@Body() commandDto: CommandDto, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.commandService.create(commandDto)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Delete('/:uuid')
    @OnUndefined(201)
    async delete(@Param('uuid') uuid: string, @Req() req: Request) {
        LogsUtil.logRequest(req);
        await this.commandService.delete(uuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get()
    @OnUndefined(404)
    async getAllRoots(@Req() req: Request): Promise<Command[] | undefined> {
        LogsUtil.logRequest(req);
        return await this.commandService.getAll()
        .catch(() => {
            throw new NotFoundError();
        })
    }

    @Get('/:uuid')
    @OnUndefined(404)
    async getOneByUuid(@Param('uuid') uuid: string, @Req() req: Request): Promise<Command | undefined> {
        LogsUtil.logRequest(req);
        return await this.commandService.getOneByUuid(uuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }
}
