import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put,  Res,  UploadedFile, UseGuards, UseInterceptors,  UsePipes,  ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/Guards/JwtAuthGuard';
import { CreateProfileDto } from 'src/profile/ProfileDtos/CreateProfile.dto';
import { UpdateProfileDto } from 'src/profile/ProfileDtos/UpdateProfile.dto';
import { ProfileExistsPipe } from 'src/profile/Validators/CheckProfileExists.validator';
import { ValidateCreateProfilePipe } from 'src/profile/Validators/CreateUserProfileDto.Validator';
import { ValidateUpdateProfilePipe } from 'src/profile/Validators/UpdateProfileDto.validator';
import { ProfileService } from 'src/profile/services/profile/profile.service';
import { IdExistsPipe } from 'src/users/Validators/UserValidatorById';
import { Response } from 'express';
import { storage } from 'src/profile/Configs/Storage';


@Controller('profile')
export class ProfileController {
    constructor(
        @Inject(ProfileService) private readonly profileService: ProfileService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    fetchProfiles() {
        return this.profileService.getProfiles();
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getProfile(@Param('id', ParseIntPipe, ProfileExistsPipe) id: number ) {
        return this.profileService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    createProfile(@Param('id', ParseIntPipe, IdExistsPipe) id: number, 
    @Body(new ValidationPipe(), ValidateCreateProfilePipe) createProfileDto: CreateProfileDto) {

        return this.profileService.create(id, createProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateProfile(@Param('id', ParseIntPipe, ProfileExistsPipe) id: number, 
    @Body(new ValidationPipe(), ValidateUpdateProfilePipe) updateProfileDto: UpdateProfileDto) {
        return this.profileService.updateOne(id, updateProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteProfile(@Param('id', ParseIntPipe, ProfileExistsPipe) id: number, ) {
        return this.profileService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/upload')
    @UseInterceptors(
        FileInterceptor('file', storage)
    )
    uploadProfileImage(@Param('id') id: number, 
    @UploadedFile() file: Express.Multer.File) {
        return this.profileService.uploadProfileImage(id, file.filename);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/profile-image')
    async getProfileImage(@Param('id', ParseIntPipe, ProfileExistsPipe) id: number, @Res() res: Response) {
        const imagePath = await this.profileService.loadProfileImage(id);
        return res.sendFile(imagePath);
    }
}
