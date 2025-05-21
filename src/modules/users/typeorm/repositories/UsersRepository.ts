import { EntityRepository, Repository } from "typeorm";
import User from '../entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User>{
    static findById(user_id: string) {
        throw new Error("Method not implemented.");
    }

    public async findByName(name : string) : Promise<User | undefined>{
        const user = this.findOne({where : {name}});
        return user;
    }

    public async findById(id : string) : Promise<User | undefined>{
        const user = this.findOne({where : {id}});
        return user;
    }

    public async findByEmail(email : string) : Promise<User | undefined>{
        const user = this.findOne({where : {email}});
        return user;
    }
}