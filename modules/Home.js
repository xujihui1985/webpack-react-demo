var React = require('react');
var TodoList = require('./TodoList');
require('./Home.css');

var Home = React.createClass({
  _retrieveData: function() {
    return [
      {val: 'hello', completed: false},
      {val: 'world', completed: true},
    ];
  },
  getInitialState: function() {
    return {
      todos: [],
      username: ''
    };
  },
  componentDidMount: function() {
    var data = this._retrieveData();
    this.setState({todos: data});
    this.setState({username: 'sean'});
  },
  updateValue: function(val, index) {
    var todos = this.state.todos;
    todos[index].val = val;
    this.setState({todos: todos});
  },
  deleteItem: function(index) {
    var todos = this.state.todos;
    todos.splice(index, 1);
    this.setState({todos: todos});
  },
  render: function() {
    return (
      <div className="home">
        {this.state.username}
        <TodoList 
          todos={this.state.todos} 
          updateVal={this.updateValue}
          deleteItem={this.deleteItem}
        /> 
      </div>
    );
  }
});

module.exports = Home;
