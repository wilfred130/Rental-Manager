import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Put, Post, UseGuards, ValidationPipe, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/Guards/JwtAuthGuard';
import { FilesExistInterceptor } from 'src/property/Interceptors/FilesExist.interceptor';
import { CreatePropertyDto } from 'src/property/PropertyDtos/CreateProperty.dto';
import { UpdatePropertyDto } from 'src/property/PropertyDtos/UpdatePropety.dto';
import { CreatePropertyValidator } from 'src/property/Validators/CreateProperty.dto.validator';
import { LandordExistsPipe } from 'src/property/Validators/LandLordExist.validator';
import { PropertyExistsPipe } from 'src/property/Validators/PropertyExists.validator';
import { UpdatePropertyValidator } from 'src/property/Validators/UpdateProperty.validator';
import { PropertyService } from 'src/property/services/property/property.service';
import { v4 as uuidv4 } from 'uuid';


@Controller('property')
export class PropertyController {

    constructor(
        @Inject(PropertyService) private propertyService: PropertyService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getProperties(){
        return this.propertyService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/one')
    getOne(@Param('id', ParseIntPipe, PropertyExistsPipe) id: number) {
        return this.propertyService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    fetchProperty(@Param('id', ParseIntPipe, LandordExistsPipe) id: number) {
        return this.propertyService.getPropertyById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    createById(@Param('id', ParseIntPipe, LandordExistsPipe) userId: number, 
    @Body(new ValidationPipe(), CreatePropertyValidator) createPropertyDto: CreatePropertyDto ) {
        return this.propertyService.create(userId, createPropertyDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteProperty(@Param('id', ParseIntPipe, PropertyExistsPipe) id: number) {
        return this.propertyService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateProperty(@Param('id', ParseIntPipe, PropertyExistsPipe) id: number, 
    @Body(new ValidationPipe(), UpdatePropertyValidator) updatePropertyDto: UpdatePropertyDto) {
        return this.propertyService.updateOne(id, updatePropertyDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/images')
    @UseInterceptors(
        FilesInterceptor('images', 10, {
            storage: diskStorage({
                destination: './uploads/propertyImages',
                filename: (req, file, callback) => {
                    const uniqueSuffix  = uuidv4();
                    const ext = extname(file.originalname);
                    const filename = `${uniqueSuffix}${ext}`;
                    callback(null, filename);
                }
            })
        }),
        FilesExistInterceptor
    )
    async uploadImages(@Param('id', ParseIntPipe, PropertyExistsPipe) id: number, 
    @UploadedFiles() files: Express.Multer.File[]) {
        const filenames = files.map(file => `${file.filename}`);
        return this.propertyService.addImages(id, filenames);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/imageLinks')
    getImages(@Param('id', ParseIntPipe, PropertyExistsPipe) id: number) {
        return this.propertyService.getImages(id);
    }   
}






