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
        //First I make sure that arguments are correct
        const checkArgs = this.checkParams(collection,query)
        if(checkArgs instanceof Error) return checkArgs

        try{
            //Then I look into the db th right collection, and using Sift I get the correct query
            const result = this.db[collection].filter(sift(query))

            //In case I got an empty Array then I return a NotFound error
            if(!result.length) return new NotFound()

            //If I successfully get the query, I return it
            return result

        }catch(err){
            //In case there has been some error, I create a new ServerError
            return new ServerError(err)
        }

    }

    findOne(collection,id){
        //If I receive an id=null then I return a NotFound Error
        if(id===null) return new NotFound('No data found with the id equal as "null".')

        //Then I make sure that arguments are correct
        const checkArgs = this.checkParams(collection,id)
        if(checkArgs instanceof Error) return checkArgs

        try{
            //Then I look into the db the especific item
            const result = this.find(collection,{id})
            const finded = result[0]

            //In case I got an empty query then I return a NotFound error
            if(!finded) return new NotFound()

            //If I successfully get the query, I return it as object and not as array
            return finded

        }catch(err){
            //In case there has been some error, I create a new ServerError
            return new ServerError(err)
        }
    }

    updateOne(collection, id, update){
        //If I receive an id=null then I return a NotFound Error
        if(id===null) return new NotFound('No data for update found with the id equal as "null".')

        //Then I make sure that arguments are correct
        const checkArgs = this.checkParams(collection,id)
        if(checkArgs instanceof Error) return checkArgs


        try{
            const item = this.findOne(collection,id)
            
            //If I don't find an item with the id given I return a NoFound error
            if(!item) return new NotFound()
            
            //If I do get th item I update the necessary info and then I return it
            for(let updating in update){
                item[updating] = update[updating]
            }
            return item
        }catch(err){
            //In case there has been some error, I create a new ServerError
            return new ServerError(err)
        }

    }
 
    checkParams(collection,secondParam){

        //With this method I can check if the request was made correctly

        const queryDic = ['users','orgs','commits'];
        
        if(!queryDic.includes(collection) || !secondParam){
            return new BadRequest()
        }
    }
}

module.exports = Server;
