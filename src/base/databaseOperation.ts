import { MongoClient, ObjectId } from "mongodb";

export default function dataBase(_db: MongoClient){
    class DataBase{
        private db = _db.db('TaroBase').collection('Combination');

        async GetAll(){
            return await this.db.find({}).toArray();
        }

        async GetCombination(id: ObjectId){
            return await this.db.findOne({_id: id});
        }

        async DeleteCombination(id: ObjectId){
            await this.db.deleteOne({_id: id});
        }

        async AddCombination(insertion: {func: string, combination: string[], free: boolean, available_count: number}){
            await this.db.insertOne(insertion);
        }

        async EditCombination(id: ObjectId, key: string, value: string | number | string[] | boolean){
            switch(key){
                case "func":
                    await this.db.updateOne({_id: id}, {$set: {func: value}});
                    break;

                case "combination":
                    await this.db.updateOne({_id: id}, {$set: {combination: value}});
                    break;

                case "free":
                    const count = !value ? 1 : 5;
                    await this.db.updateOne({_id: id}, {$set: {free: value, available_count: count}});
                    break;

                case "available_count":
                    await this.db.updateOne({_id: id}, {$set: {free: true, available_count: value}});
                    break;

                default:
                    throw new Error("Wrong key");
            }
        }

        async ChangeAvailableCountFreeCombination(id: ObjectId, count: number){
            await this.db.updateOne({_id: id}, {$set: {available_count: count}});
        }

        async AddUsersToCombination(id: ObjectId, users: string){
            const combination = await this.db.findOne({_id: id}),
                _users = combination?.users || [];
            
            _users.push(users);

            await this.db.updateOne({_id: id}, {$set: {users: _users}});
        }
    }

    return new DataBase();
}