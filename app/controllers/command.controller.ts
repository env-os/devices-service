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

    @Delete('/:slug')
    @OnUndefined(201)
    async delete(@Param('slug') slug: string, @Req() req: Request) {
        LogsUtil.logRequest(req);
        await this.commandService.delete(slug)
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

    @Get('/:slug')
    @OnUndefined(404)
    async getOneBySlug(@Param('slug') slug: string, @Req() req: Request): Promise<Command | undefined> {
        LogsUtil.logRequest(req);
        return await this.commandService.getOneBySlug(slug)
        .catch(() => {
            throw new NotFoundError();
        })
    }
}
