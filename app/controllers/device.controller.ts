import { JsonController, Get, Param, Post, Delete, Body, Res, OnUndefined, Req } from 'routing-controllers';
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
        await this.deviceService.create(deviceDto);
    }

    @Delete('/:slug')
    @OnUndefined(201)
    public async delete(@Param('slug') slug: string, @Req() req: Request): Promise<void> {
        LogsUtil.logRequest(req);
        await this.deviceService.delete(slug);
    }

    @Get()
    @OnUndefined(404)
    public async getAll(@Req() req: Request): Promise<Device[]> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getAll();
    }

    @Get('/:slug')
    @OnUndefined(404)
    public async getOneBySlug(@Param('slug') slug: string, @Req() req: Request): Promise<Device | undefined> {
        LogsUtil.logRequest(req);
        return await this.deviceService.getOneBySlug(slug);
    }
}