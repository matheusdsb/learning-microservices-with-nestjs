import { Module } from "@nestjs/common";
import { ProductController } from "./controllers/product";
import { ProductService } from "./services/product.service";

@Module({
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {}