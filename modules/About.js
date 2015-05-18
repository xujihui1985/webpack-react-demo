var React = require('react');
var {Link, RouteHandler} = require('react-router');

var About = React.createClass({
  statics: {
    fetchData: function(params) {
      return new Promise(function(resolve, reject) {
        resolve({name: 'sean'});
      });
    }
  },
  render: function() {
    return (
      <div>
        <div>About</div>
        <div><Link to="about-company">Company</Link></div>
        <RouteHandler />
       </div>
    );
  }
});

module.exports = About;
