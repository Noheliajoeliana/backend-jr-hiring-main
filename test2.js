const { NotFound } = require('./test/utils/errors');

module.exports = async function Test2 (server, queries) {
    try{
        //NR: In this function, I try to query to a DB, where I could receive an Array, an empty array or an error
        
        const response = await server.query(queries); // Will return an array with the results, empty array or error
        const res = JSON.parse(response);
        if(!res.length){
            //If I get an empy artay I return a NotFound error
            return new NotFound()
        }
        return res; //also, if i succesfully get the query, I return it
    }catch(err){
        //I always have to handle any posible error, since the method 'server.query' already throws a 'ServerError', I only need to return it to pass the test.
        //If I hadn't that error thrown, I would had to create one and the return it

        return err
    }
}
