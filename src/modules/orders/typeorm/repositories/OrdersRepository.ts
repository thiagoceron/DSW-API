import { Entity, EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";
import Customer from "@modules/customers/typeorm/entities/Customer";


interface IProduct{
   product_id: string;
   price: number;
   quantity: number;
}


interface IRequest{
   customer: Customer;
   products: IProduct[];
}


@EntityRepository(Order)
export default class OrdersRepository extends Repository<Order>{


   public async findById(id: string): Promise<Order | undefined> {
       const order = await this.findOne(id, {
           relations: ['orders_products', 'customer']
       });
       return order;
   }


   public async createOrder({ customer, products} : IRequest): Promise<Order>{
       const order = this.create({customer, orders_products: products});
       await this.save(order);
       return order;
   }
}
