import { IsString} from "class-validator";
 
export class DeviceDto {
    
    @IsString()
    readonly name: string = "";
 
    @IsString()
    readonly macaddress: string = "";
 
    @IsString()
    readonly description: string = "";  
}