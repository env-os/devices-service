import { JsonController, Get, Param, Post, Delete, Body, OnUndefined, Req, BadRequestError, NotFoundError } from 'routing-controllers';
import { Request } from 'express'
import { DeviceService } from '../services/device.service';
import { Device } from '../entities/device.entity';
import { DeviceDto } from '../dto/device.dto';
import { LogsUtil } from '../utils/logs.util';

@JsonController('/devices')
export class DeviceController {
    constructor(
        private deviceService: DeviceService,
    ) {}

    @Post()
    @OnUndefined(201)
    public async create(@Body() deviceDto: DeviceDto, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.deviceService.create(deviceDto)
        .catch(() => {
            throw new BadRequestError("Error during device creation.");
        })
    }

    @Delete('/:uuid')
    @OnUndefined(201)
    public async delete(@Param('uuid') uuid: string, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.deviceService.delete(uuid)
        .catch(() => {
            throw new BadRequestError();
        })
    }

    @Get()
    @OnUndefined(404)
    public async getAll(@Req() req: Request): Promise<Device[]> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getAll()
        .catch(() => {
            throw new NotFoundError()
        })
    }

    @Get('/:uuid')
    @OnUndefined(404)
    public async getOneByUuid(@Param('uuid') uuid: string, @Req() req: Request): Promise<Device> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getOneByUuid(uuid)
        .catch(() => {
            throw new NotFoundError();
        })
    }
}