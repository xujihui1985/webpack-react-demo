webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var App = __webpack_require__(7);
	var Home = __webpack_require__(8);
	var About = __webpack_require__(9);
	var Company = __webpack_require__(6);
	var React = __webpack_require__(32);
	var Router = __webpack_require__(2);
	var $__0=     Router,Route=$__0.Route,DefaultRoute=$__0.DefaultRoute;

	var routes = (
	  React.createElement(Route, {path: "/", handler: App}, 
	    React.createElement(DefaultRoute, {name: "home", handler: Home}), 
	    React.createElement(Route, {name: "about", handler: About}, 
	      React.createElement(Route, {name: "about-company", path: "company", handler: Company})
	    )
	  )
	)

	Router.run(routes, function (Root, state) {
	  console.log(state);
	    React.render(React.createElement(Root, null), document.body);
	});


/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(32);
	var Navigation = __webpack_require__(2).Navigation;

	var Home = React.createClass({displayName: "Home",
	  mixins: [Navigation],
	  render: function() {
	    return (
	      React.createElement("div", {className: "company"}, 
	        "Company", 
	        React.createElement("button", {onClick: this.goBack}, "go back"), 
	        React.createElement("button", {onClick: function() {this.transitionTo('home')}.bind(this)}, "go to home")
	      )
	    );
	  }
	});

	module.exports = Home;


/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(32);
	var $__0=   __webpack_require__(2),Link=$__0.Link,RouteHandler=$__0.RouteHandler;

	__webpack_require__(31);
	__webpack_require__(3);

	var App = React.createClass({displayName: "App",
	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement("header", null, 
	          React.createElement("ul", null, 
	            React.createElement("li", null, React.createElement(Link, {to: "home"}, "Home")), 
	            React.createElement("li", null, React.createElement(Link, {to: "about"}, "About"))
	          )
	        ), 

	       React.createElement(RouteHandler, null)
	      )
	    );
	  }
	});

	module.exports = App;


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(32);
	var TodoList = __webpack_require__(33);
	__webpack_require__(34);

	var Home = React.createClass({displayName: "Home",
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
	      React.createElement("div", {className: "home"}, 
	        this.state.username, 
	        React.createElement(TodoList, {
	          todos: this.state.todos, 
	          updateVal: this.updateValue, 
	          deleteItem: this.deleteItem}
	        )
	      )
	    );
	  }
	});

	module.exports = Home;


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(32);
	var $__0=   __webpack_require__(2),Link=$__0.Link,RouteHandler=$__0.RouteHandler;

	var About = React.createClass({displayName: "About",
	  render: function() {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", null, "About"), 
	        React.createElement("div", null, React.createElement(Link, {to: "about-company"}, "Company")), 
	        React.createElement(RouteHandler, null)
	       )
	    );
	  }
	});

	module.exports = About;


/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(32);
	var TodoItem = __webpack_require__(53);

	var TodoList = React.createClass({displayName: "TodoList",
	  propTypes: {
	    updateVal: React.PropTypes.func.isRequired,
	    deleteItem: React.PropTypes.func.isRequired
	  },
	  render: function() {
	    return (
	      React.createElement("div", {className: "todos"}, 
	        React.createElement("h1", null, "TodoList"), 
	        this.props.todos.map(function(todo, index) {
	          return (
	            React.createElement(TodoItem, {
	              key: index, 
	              todo: todo, 
	              index: index, 
	              updateVal: this.props.updateVal, 
	              deleteItem: this.props.deleteItem}
	            )
	          );
	        }.bind(this))
	      )
	    ); 
	  }
	});

	module.exports = TodoList;


/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(32);

	var TodoItem = React.createClass({displayName: "TodoItem",
	  propTypes: {
	    updateVal: React.PropTypes.func.isRequired,
	    deleteItem: React.PropTypes.func.isRequired
	  },
	  _onTextChanged: function(e) {
	    this.props.updateVal(e.target.value, this.props.index);
	  },
	  _onDelete: function(e) {
	    this.props.deleteItem(this.props.index);
	  },
	  render: function() {
	    return (
	      React.createElement("div", {className: "input-group input-group-lg"}, 
	        React.createElement("span", {style: {backgroundColor: 'red'}, className: "input-group-addon"}, 
	        React.createElement("input", {type: "checkbox"})
	        ), 
	        React.createElement("input", {
	          type: "text", 
	          value: this.props.todo.val, 
	          onChange: this._onTextChanged}
	        ), 
	        React.createElement("span", {className: "input-group-btn"}, 
	          React.createElement("button", {onClick: this._onDelete, className: "btn btn-danger"}, 
	            React.createElement("i", {className: "glyphicon glyphicon-remove"}), 
	            "Delete"
	          )
	        )
	      )
	    ); 
	  }
	});

	module.exports = TodoItem;


/***/ }

});