import { JsonController, Get, Param, Post, Delete, Body, Res } from 'routing-controllers';
import {Response} from 'express'
import { DeviceService } from '../services/device.service';
import { Device } from '../entities/device.entity';
import { DeviceDto } from '../dto/device.dto';

@JsonController('/devices')
export class DeviceController {
    constructor(
        private deviceService: DeviceService,
    ) {}

    @Post()
    async create(@Body() deviceDto: DeviceDto, @Res() res: Response) {
        console.log("Received POST request for create a new device");
        const response = await this.deviceService.create(deviceDto);
        console.log(response);
        return res.send(response);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        console.log("Received DELETE request to eliminate a device");
        const response = await this.deviceService.delete(id);
        console.log(response);
        return res.send(response);
    }
    
    @Get('/:id')
    async getOneById(@Param('id') id: number): Promise<Device>{
        console.log("Received GET request to view one device");
        return await this.deviceService.getOneById(id);
    }

    @Get()
    async getAll(): Promise<Device[]>{
        console.log("Received GET request to view all devices");
        return await this.deviceService.getAll();
    }
}