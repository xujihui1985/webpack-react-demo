var React = require('react');
var {Link, RouteHandler} = require('react-router');

require('./App.css');
require('bootstrap.css');

var App = React.createClass({
  render: function() {
    console.log(this.props.data);
    return (
      <div>
        <header>
          <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="about">About</Link></li>
          </ul>
        </header>
       <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
