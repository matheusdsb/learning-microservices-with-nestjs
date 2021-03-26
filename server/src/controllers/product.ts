import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "src/services/product.service";

@Controller('products')
export class ProductController {

    constructor(private readonly service: ProductService) {}

    @Post()
    add(@Body() body: {
        title: string, 
        desc: string, 
        price: number
    }): {id: string, title: string} {
       const { id, title} = this.service.insert(body.title, body.desc, body.price);
       return {id, title};
    }

    @Get()
    getAll() {
        return this.service.getAll()
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.service.getById(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string, 
        @Body() body: {
            title: string, 
            desc: string, 
            price: number
        }
    ) {
        return this.service.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.delete(id)
    }
}