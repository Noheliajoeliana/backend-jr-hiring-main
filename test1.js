
module.exports = function Test1(server,name) {
  server.on('name', data => data);
  return server.events.name(name)
}
