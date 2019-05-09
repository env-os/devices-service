
import { IsString, IsIP } from "class-validator";
 
export class CreateDeviceDto {
    
    @IsString()
    readonly name: string = "";
 
    @IsString()
    readonly macaddress: string = "";
 
    @IsString()
    readonly description: string = "";  
}