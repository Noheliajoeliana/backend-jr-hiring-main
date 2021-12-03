
module.exports = function Test1(server,name) {

  //NR: According to test1.test.js the function Test1 receives 2 arguments, the server and a random name.
  //In this function, I set the attribute 'name' in the object server.events with a callback, which receives an arguments and returns it.
  //The correct way to access to that argument, without hardcoding it is accessing to the result of server.events.name being called with tha name used.
  server.on('name', data => data);
  return server.events.name(name)
}
