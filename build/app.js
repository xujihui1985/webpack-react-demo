webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var App = __webpack_require__(7);
	var Home = __webpack_require__(8);
	var About = __webpack_require__(9);
	var Company = __webpack_require__(6);
	var React = __webpack_require__(31);
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

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(31);
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

	var React = __webpack_require__(31);
	var $__0=   __webpack_require__(2),Link=$__0.Link,RouteHandler=$__0.RouteHandler;

	__webpack_require__(1);
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

	var React = __webpack_require__(31);
	__webpack_require__(33);

	var Home = React.createClass({displayName: "Home",
	  render: function() {
	    return (
	      React.createElement("div", {className: "home"}, "Home")
	    );
	  }
	});

	module.exports = Home;


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(31);
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

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ }

});