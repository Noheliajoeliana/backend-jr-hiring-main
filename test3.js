const sift = require('sift');
const {NotFound,ServerError,BadRequest} = require('./test/utils/errors');

// This is a bonus but you need to do the previous tests before

class Server {
    // Create your server with query features with sift
    // We pass the db when the Server is instantiated (constructor)
    constructor(db){
        this.db = db;
    }
    
    find(collection, query){
        const queryDic = ['users','orgs','commits'];
        
        //First I make sure that the arguments are correct
        if(!queryDic.includes(collection) || !query){
            return new BadRequest()
        }

        try{
            //Then I look into the db th right collection, and using Sift I get the correct query
            const arr = this.db[collection]
            const result = arr.filter(sift(query))

            if(!result.length){
                //In case I got an empty Array then I return a NotFound error
                return new NotFound()
            }

            //If I successfully get the query, I return it
            return result
        }catch(err){

            //In case there has been some error, I create a new ServerError
            return new ServerError(err)
        }

    }

    findOne(){

    }

    updteOne(){

    }
}

module.exports = Server;
