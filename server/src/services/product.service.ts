import { Injectable, NotFoundException } from "@nestjs/common";
import { pipe } from "rxjs";
import { Product } from "src/models/product";


@Injectable()
export class ProductService {
    private products: Product[] = [];

    insert(title: string, desc: string, price: number): Product {
        const id = new Date().getTime().toString();
        const product = new Product(
            id,
            title,
            desc,
            price
        )
        this.products.push(product)
        return product
    }

    getAll() {
        return [...this.products]
    }

    getById(id: string): Product {
        const product = this.find(id)[0]
        return { ...product }
    }

    update(id: string, data: {title: string, desc: string, price: number}) {
        const updatedProduct = this.find(id)[0]
        if(data.title) {
            updatedProduct.title = data.title;
        }
        if(data.desc) {
            updatedProduct.desc = data.desc;
        }
        if(data.price) {
            updatedProduct.price = data.price;
        }
        return;
    }

    delete(id: string) {
        const [_, index] = this.find(id)
        this.products.splice(index, 1)
        return
    }

    private find(id: string): [Product, number] {
        const index = this.products.findIndex(p => p.id === id)
        if(index < 0) {
            throw new NotFoundException('Product not found')
        }
        return [this.products[index], index]
    }
}