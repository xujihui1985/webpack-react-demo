var React = require('react');
var TodoList = require('./TodoList');
var AppStore = require('./AppStore');
var AppAction = require('./AppAction');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
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
      username: '',
      loading: false
    };
  },
  componentDidMount: function() {
    var data = this._retrieveData();
    AppStore.addChangeListener(this._onChange);
    this.setState({todos: data});
    this.setState({username: 'sean'});
  },
  _onChange: function() {
    console.log(AppStore.getCreatedItem());
    this.setState({loading: AppStore.showSpinner()});
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
  refresh: function() {
    AppAction.create({name: 'sean'});
  },
  render: function() {
    var loading;
    if(this.state.loading) {
      loading = <div>loading....</div>
    }
    return (
      <div className="home">
        <ReactCSSTransitionGroup transitionName='loading'
          transitionEnter={false}
          transitionLeave={true}>
          {loading}
        </ReactCSSTransitionGroup>
        {this.state.username}
        <TodoList 
          todos={this.state.todos} 
          updateVal={this.updateValue}
          deleteItem={this.deleteItem}
        /> 
        <button 
          className={"btn btn-primary"}
          onClick={this.refresh}
          disabled={loading}>
          refresh
        </button>
      </div>
    );
  }
});

module.exports = Home;
