webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var App = __webpack_require__(6);
	var Home = __webpack_require__(7);
	var About = __webpack_require__(8);
	var React = __webpack_require__(31);
	var Router = __webpack_require__(2);
	var $__0=     Router,Route=$__0.Route,DefaultRoute=$__0.DefaultRoute;

	var routes = (
	  React.createElement(Route, {path: "/", handler: App}, 
	    React.createElement(DefaultRoute, {name: "home", handler: Home}), 
	    React.createElement(Route, {name: "about", handler: About})
	  )
	)

	Router.run(routes, function (Handler) {
	    React.render(React.createElement(Handler, null), document.body);
	});


/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(31);
	var $__0=   __webpack_require__(2),Link=$__0.Link,RouteHandler=$__0.RouteHandler;

	__webpack_require__(30);
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

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(31);
	__webpack_require__(32);

	var Home = React.createClass({displayName: "Home",
	  render: function() {
	    return (
	      React.createElement("div", {className: "home"}, "Home")
	    );
	  }
	});

	module.exports = Home;


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(31);

	var About = React.createClass({displayName: "About",
	  render: function() {
	    return (
	      React.createElement("div", null, "About")
	    );
	  }
	});

	module.exports = About;


/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ }

});