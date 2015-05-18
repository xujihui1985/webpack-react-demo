var App = require('./App');
var Home = require('./Home');
var About = require('./About');
var Company = require('./Company');
var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute } = Router;

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="about" handler={About}>
      <Route name="about-company" path="company" handler={Company} />
    </Route>
  </Route>
)

Router.run(routes, function (Root, state) {
  var promises = state.routes.filter(function(route) {
    return route.handler.fetchData;
  }).reduce(function(promises, route){
    promises.push(route.handler.fetchData(state.params));
    return promises;
  }, []);
  Promise.all(promises).then(function(data) {
    React.render(<Root data={data}/>, document.body);
  })
});
