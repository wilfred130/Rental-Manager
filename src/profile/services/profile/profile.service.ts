import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Profile } from 'src/Typeorm/Entities/Profile';
import { User } from 'src/Typeorm/Entities/User';
import { CreateProfileParams, UpdateProfileParams } from 'src/profile/Types/types';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
        @Inject(UsersService) private readonly usersService: UsersService,

    ){}

    // get profiles
    getProfiles() {
        return this.profileRepository.find();
    }

    // find one profile
    findOne(id: number) {
        return this.profileRepository.findOneBy({ id });
    }

    // create profile
    async create(id: number, profileDetails: CreateProfileParams) {
        const user = await this.usersService.findOne(id);
        const newProfile =  this.profileRepository.create({
            ...profileDetails,
            user
        })

        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user); 
    }

    // update one profile
    async updateOne(id: number, updateProfileParam: UpdateProfileParams){
        const profile = await this.findOne(id);
        Object.assign(profile, updateProfileParam);
        return await this.profileRepository.save(profile);
    }

    // delete one profile
    async remove(id: number) {
        return this.profileRepository.delete({ id });
    }

    // uploading profile image
    async uploadProfileImage(id: number,fileName: string) {
        const profile = await this.findOne(id);
        profile.profileImage = fileName;
        return this.profileRepository.save(profile);
    }
    
    // geting profile image
    async loadProfileImage(id: number) {
        const profile = await this.findOne(id);
        const profileImagePath = profile.profileImage;
        return `/profileImages/${profileImagePath}`;
    }
    // deleting profile image
}
