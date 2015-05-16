var React = require('react');
var Navigation = require('react-router').Navigation;

var Home = React.createClass({
  mixins: [Navigation],
  render: function() {
    return (
      <div className="company">
        Company
        <button onClick={this.goBack}>go back</button>
        <button onClick={function() {this.transitionTo('home')}.bind(this)}>go to home</button>
      </div>
    );
  }
});

module.exports = Home;
