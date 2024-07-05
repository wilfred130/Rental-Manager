import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "../services/users/users.service";

@Injectable()
export class UsernameExistsPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    
    if(value.username) {
      
      const user = await this.userService.findByUsername(value.username);
      if (user) {
        throw new BadRequestException('Username already exists');
      }
    } else if(!value.username) {
      return;
    }
    return value;
  }
}