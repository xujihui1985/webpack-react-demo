var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({
  propTypes: {
    updateVal: React.PropTypes.func.isRequired,
    deleteItem: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="todos">
        <h1>TodoList</h1>
        {this.props.todos.map(function(todo, index) {
          return (
            <TodoItem 
              key={index}
              todo={todo}
              index={index}
              updateVal={this.props.updateVal}
              deleteItem={this.props.deleteItem}
            />
          );
        }.bind(this))}
      </div>
    ); 
  }
});

module.exports = TodoList;
