import { Device } from '../entities/device.entity';

export class CommandDto {
  readonly uuid!: string;
  readonly name!: string;
  readonly description!: string;
  readonly device!: Device;
}