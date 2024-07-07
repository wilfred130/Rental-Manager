import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { Property } from 'src/Typeorm/Entities/Property';
import { User } from 'src/Typeorm/Entities/User';
import { ICreatePropertyDto } from 'src/property/Types/CreateProperty.dto.interface';
import { IUpdatePropertyDto } from 'src/property/Types/UpdateProperty.interface';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(Property) private readonly propertyRepository: Repository<Property>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    // find All
    getAll() {
        return this.propertyRepository.find({relations: ['landlord', 'amenities']});
    }

    // find one
    findOne(id: number) {
        return this.propertyRepository.findOneBy({ id });
    }

    // get property by landlordId
    async getPropertyById(id: number) {
        const properties = await this.propertyRepository.find({
            where: {landlord: {id: id}}
        });
        return properties;
    }

    // create property
    async create(id: number, createPropertyParams: ICreatePropertyDto ) {
        const user = await this.userRepository.findOne({where: {id: id}, 
        relations: ['properties']});

        const newProperty = this.propertyRepository.create(createPropertyParams);

        newProperty.landlord = user;

        if(!user.properties)
            user.properties = [];
        user.properties.push(newProperty);
        await this.propertyRepository.save(newProperty);
        await this.userRepository.save(user);
        return {
            ...newProperty,
            landlord: { id: user.id, username: user.username, email: user.email },
        };
    }  
    
    // delete property
    async remove(id: number) {
        const property = await this.propertyRepository.findOneBy({ id });
        return this.propertyRepository.remove(property);
    }

    // update property
    async updateOne(id: number, updatePropertyParams: IUpdatePropertyDto) {
        const property = await this.findOne(id);
        Object.assign(property, updatePropertyParams);
        return await this.propertyRepository.save(property);
    }
    
    // upload images
    async addImages(id: number, filenames: string[]) {
        const property = await this.propertyRepository.findOneBy({ id });
        if(!property.images) {
            property.images = [];
        }
        property.images = [...property.images, ...filenames];
        return this.propertyRepository.save(property);
    }

    // get images
    async getImages(id: number) {
        const propety = await this.propertyRepository.findOneBy({ id });
        const filenames = propety.images.map(imagePath => `/propertyImages/${imagePath}`);
        return filenames;
    }
}
