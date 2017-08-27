// temporary route to handle get request to the root route

module.exports = function(app){
  app.get('/', (req, res, next) => {
    res.send({ hello: 'worlds' });
  });
}
