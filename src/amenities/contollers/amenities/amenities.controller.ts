import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateAmenitiesDto } from 'src/amenities/AmenitiesDto/Create_amenities.dto';
import { UpdateAmenitiesDto } from 'src/amenities/AmenitiesDto/Update_amenities.dto';
import { AmenityExistInterceptor } from 'src/amenities/Interceptors/AmenityExists.interceptor';
import { AmenitiesService } from 'src/amenities/services/amenities/amenities.service';
import { AmenityExistsPipe } from 'src/amenities/Validators/amenities_exists.validator';
import { CreateAmenitiesValidator } from 'src/amenities/Validators/Create_amenities.validator';
import { UpdateAmenitiesValidator } from 'src/amenities/Validators/Update_amenities.validator';
import { JwtAuthGuard } from 'src/auth/Guards/JwtAuthGuard';
import { PropertyExistsPipe } from 'src/property/Validators/PropertyExists.validator';
import { v4 as uuidv4 } from 'uuid';

@Controller('amenities')
export class AmenitiesController {

    constructor(
        @Inject(AmenitiesService) private readonly amenitiesService: AmenitiesService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    addAmenity(@Param('id', ParseIntPipe, PropertyExistsPipe) id: number, @Body(new ValidationPipe, CreateAmenitiesValidator) createAmenitiesDto: CreateAmenitiesDto) {
        return this.amenitiesService.create(id, createAmenitiesDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    fetchAmenitiesByPropId(@Param('id', ParseIntPipe, PropertyExistsPipe) id: number){
        return this.amenitiesService.getAllByPropertyId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateAmenity(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe, UpdateAmenitiesValidator) updateAmenityDto: UpdateAmenitiesDto) {
        return this.amenitiesService.updateAmenityById(id, updateAmenityDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    fetchAmenities(){
        return this.amenitiesService.fetchAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteAmenities(@Param('id', ParseIntPipe, AmenityExistsPipe) id: number){
        return this.amenitiesService.deleteOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/images')
    @UseInterceptors(
        FilesInterceptor('images', 4, {
            storage: diskStorage({
                destination: './uploads/amenitiesImages',
                filename: (req, file, callback) => {
                    const uniqueSuffix  = uuidv4();
                    const ext = extname(file.originalname);
                    const filename = `${uniqueSuffix}${ext}`;
                    callback(null, filename);
                }
            })
        }),
        AmenityExistInterceptor
    )
    async uploadImages(@Param('id', ParseIntPipe) id: number, 
    @UploadedFiles() files: Express.Multer.File[]) {
        const filenames = files.map(file => file.filename);
        return this.amenitiesService.addImages(id, filenames);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/one')
    getImages(@Param('id', ParseIntPipe, AmenityExistsPipe) id: number) {
        return this.amenitiesService.getImages(id);
    }
}
