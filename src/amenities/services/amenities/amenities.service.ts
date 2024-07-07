import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { ICreateAmenities } from 'src/amenities/Types/Create_amenties.dto.interface';
import { IUpdateAmenities } from 'src/amenities/Types/Update_amenities.dto.interface';
import { PropertyService } from 'src/property/services/property/property.service';
import { Amenities } from 'src/Typeorm/Entities/Amenities';
import { Property } from 'src/Typeorm/Entities/Property';
import { Repository } from 'typeorm';

@Injectable()
export class AmenitiesService {

    constructor(
        @InjectRepository(Amenities) private readonly amenitiesRepository: Repository<Amenities>,
        @InjectRepository(Property) private readonly propertyRepository: Repository<Property>,
    ){}

    // find one
    findOne(id: number) {
        return this.amenitiesRepository.findOneBy({ id });
    }
    // get all
    fetchAll(){
        return this.amenitiesRepository.find();
    }
    
    // remove cicular dependencies
    private stripCircularReferences(amenity: Amenities): any {
        const { property, ...rest } = amenity;
        return {
          ...rest,
        };
    }
    // create amenities
    async create(id: number, createAmentiesDetails: ICreateAmenities) {
        const Property = await this.propertyRepository.findOne({where: {id:id}, relations: ['amenities']});
        const newAmenity = this.amenitiesRepository.create(createAmentiesDetails);
        newAmenity.property = Property;
        const savedAmenity = await this.amenitiesRepository.save(newAmenity);

        if(!Property.amenities) 
            Property.amenities = [];

        Property.amenities.push(savedAmenity);

        await this.propertyRepository.save(Property);
        
        const {property, ...rest} = savedAmenity;
        return {
            ...rest,
            property: property ? { id: property.id } : null, // Only include the property ID
        };
    }

    // get property amenties
    async getAllByPropertyId(id: number) {
        const property = this.propertyRepository.findOne({where: {id: id}, relations: ['amenities']});
        return (await property).amenities.map(amenity =>this.stripCircularReferences(amenity));
    }

    // update amenities
    async updateAmenityById(id: number, updateAmenitiesDetails: IUpdateAmenities) {
        const amenity = await this.amenitiesRepository.findOne({where: {id: id}, relations: ['property']});
        Object.assign(amenity, updateAmenitiesDetails);
        const updateAmenity =  await this.amenitiesRepository.save(amenity);
        return this.stripCircularReferences(updateAmenity);
    }

    // delete amenities
    deleteOne(id: number){
        return this.amenitiesRepository.delete(id);
    }

    // uploading amenties images
    async addImages(id: number, filenames: string[] ){
        const amenity = await this.amenitiesRepository.findOneBy({ id });
        if(!amenity.images) {
            amenity.images = [];
        }
        amenity.images = [...amenity.images, ...filenames];
        return this.amenitiesRepository.save(amenity);
    }

    // get images
    async getImages(id: number) {
        const amenity = await this.amenitiesRepository.findOneBy({ id });
        const filenames = amenity.images.map(imagePath => `/amenitiesImages/${imagePath}`);
        return filenames;
    }
}
