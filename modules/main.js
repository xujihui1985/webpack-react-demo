var App = require('./App');
var Home = require('./Home');
var About = require('./About');
var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute } = Router;

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="about" handler={About} />
  </Route>
)

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});
