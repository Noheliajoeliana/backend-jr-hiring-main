
module.exports = function Test1(server) {
  //In this function I need to return a Promise that will be solve whenever server.on is being called, and since it's solved to the argument of the callback then the return value will be that argument

  return new Promise(res => {
    server.on('name', data => {
      //I solve the promise to the value of the argument to receive it when I invoke Test1
      res(data)

      //Then I return the value of data so when I invoke the method server.events.name(randomName) I could also receive the argument
      return data
  } );
  });
}
