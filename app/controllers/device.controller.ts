import { JsonController } from 'routing-controllers';
import { DeviceService } from '../services/device.service';


@JsonController('/devices')
export class DeviceController {
    constructor(
        private deviceService: DeviceService,
    ) {}
}