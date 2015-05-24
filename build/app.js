webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var App = __webpack_require__(4);
	var Home = __webpack_require__(5);
	var About = __webpack_require__(6);
	var Company = __webpack_require__(3);
	var React = __webpack_require__(38);
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
	  var promises = state.routes.filter(function(route) {
	    return route.handler.fetchData;
	  }).reduce(function(promises, route){
	    promises.push(route.handler.fetchData(state.params));
	    return promises;
	  }, []);
	  Promise.all(promises).then(function(data) {
	    React.render(React.createElement(Root, {data: data}), document.body);
	  })
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(38);
	var Navigation = __webpack_require__(2).Navigation;
	var AnswerMultipleChoiceQuestion = __webpack_require__(27);
	
	var Home = React.createClass({displayName: "Home",
	  statics: {
	    willTransitionTo: function(transition, params, query, callback) {
	      console.log('transition to', transition);
	      callback();
	    },
	    willTransitionFrom: function(transition, component) {
	      console.log('transition from', transition);
	      console.log('component', component);
	      transition.abort();
	    }
	  },
	  mixins: [Navigation],
	  getInitialState: function() {
	    var choices = [
	        {label:'hello', value:'hello', checked:true},
	        {label:'world', value:'world', checked:false}
	    ];
	    return {
	      choices: choices,
	      selected: choices[0]
	    };
	  },
	  choiceType: function(index) {
	    var choices = this.state.choices;
	    var selected;
	    choices.forEach(function(item, i) {
	      if(index === i) {
	        item.checked = true;
	        selected = item;
	      } else {
	        item.checked = false;
	      }
	    }.bind(this));
	    this.setState({choices: choices, selected: selected});
	  },
	  render: function() {
	    var goback;
	    if(this.state.selected.value === 'hello') {
	      goback = (
	        React.createElement("div", null, 
	          React.createElement("button", {onClick: this.goBack}, "go back"), 
	          React.createElement("button", {onClick: function() {this.transitionTo('home')}.bind(this)}, "go to home")
	        )
	      );
	    }
	    return (
	      React.createElement("div", {className: "company"}, 
	        "Company", 
	        React.createElement(AnswerMultipleChoiceQuestion, {
	          label: "multiple-choice", 
	          choices: this.state.choices, 
	          onCompleted: this.choiceType}), 
	        goback
	      )
	    );
	  }
	});
	
	module.exports = Home;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(38);
	var $__0=   __webpack_require__(2),Link=$__0.Link,RouteHandler=$__0.RouteHandler;
	
	__webpack_require__(42);
	__webpack_require__(46);
	
	var App = React.createClass({displayName: "App",
	  render: function() {
	    console.log(this.props.data);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(38);
	var TodoList = __webpack_require__(28);
	var AppStore = __webpack_require__(29);
	var AppAction = __webpack_require__(30);
	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
	__webpack_require__(44);
	
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
	      loading = React.createElement("div", null, "loading....")
	    }
	    return (
	      React.createElement("div", {className: "home"}, 
	        React.createElement(ReactCSSTransitionGroup, {transitionName: "loading", 
	          transitionEnter: false, 
	          transitionLeave: true}, 
	          loading
	        ), 
	        this.state.username, 
	        React.createElement(TodoList, {
	          todos: this.state.todos, 
	          updateVal: this.updateValue, 
	          deleteItem: this.deleteItem}
	        ), 
	        React.createElement("button", {
	          className: "btn btn-primary", 
	          onClick: this.refresh, 
	          disabled: loading}, 
	          "refresh"
	        )
	      )
	    );
	  }
	});
	
	module.exports = Home;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(38);
	var $__0=   __webpack_require__(2),Link=$__0.Link,RouteHandler=$__0.RouteHandler;
	
	var About = React.createClass({displayName: "About",
	  statics: {
	    fetchData: function(params) {
	      return new Promise(function(resolve, reject) {
	        resolve({name: 'sean'});
	      });
	    }
	  },
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
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(38);
	var AnswerRadioInput = __webpack_require__(49);
	
	function idGenerator2() {
	  var cache={};
	  return function(prefix) {
	    if(cache[prefix] == null) {
	      cache[prefix] = 0;
	    } else {
	      cache[prefix] += 1;
	    }
	    return prefix+cache[prefix];
	  }  
	}
	
	var AnswerMultipleChoiceQuestion = React.createClass({displayName: "AnswerMultipleChoiceQuestion",
	  idGenerator: idGenerator2(),
	  propTypes: {
	    choices: React.PropTypes.array.isRequired,
	    label: React.PropTypes.string.isRequired,
	    onCompleted: React.PropTypes.func.isRequired
	  },
	  getInitialState: function() {
	    return {
	      id: this.idGenerator('multiple-choice-')
	    };
	  },
	  handleChanged: function(id) {
	    this.props.onCompleted(id);
	  },
	  renderChoises: function() {
	    return this.props.choices.map(function(choice, i) {
	      return (
	        React.createElement(AnswerRadioInput, {
	          id: "choice-"+i, 
	          name: "radio", 
	          label: choice.label, 
	          value: choice.value, 
	          checked: choice.checked, 
	          index: i, 
	          onChanged: this.handleChanged}
	        )
	      )
	    }.bind(this)) 
	  },
	  render: function() {
	    return (
	      React.createElement("div", {className: "form-group"}, 
	        React.createElement("label", {
	              className: "item-label", 
	              htmlFor: this.state.id}, 
	            this.props.label
	        ), 
	        React.createElement("div", {className: "survey-item-content"}, 
	          this.renderChoises()
	        )
	      )
	    ); 
	  
	  }
	});
	
	module.exports = AnswerMultipleChoiceQuestion;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(38);
	var TodoItem = __webpack_require__(50);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(51);
	var EventEmitter = __webpack_require__(59).EventEmitter;
	var assign = __webpack_require__(60);
	
	
	var _showSpinner = false;
	var _createdItem={};
	
	var AppStore = assign({}, EventEmitter.prototype, {
	
	  showSpinner: function() {
	    return _showSpinner;
	  },
	
	  getCreatedItem: function() {
	    return _createdItem;
	  },
	  
	  emitChange: function() {
	    this.emit('change');
	  },
	
	  addChangeListener: function(callback) {
	    this.on('change', callback) ;
	  },
	
	  removeChangeListener: function(callback) {
	    this.removeListener('change', callback);
	  }
	});
	
	AppDispatcher.register(function(action) {
	
	  switch(action.actionType) {
	    case 'starttocreate':
	      _showSpinner = true;      
	      break;
	    case 'created':
	      _showSpinner = false;
	      _createdItem = action.item;
	      break;
	    default:
	      break;
	  }
	  AppStore.emitChange();
	});
	
	module.exports = AppStore;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(51);
	var Api = __webpack_require__(52);
	
	var AppActions = {
	  create: function(item) {
	     AppDispatcher.dispatch({
	       actionType: 'starttocreate',
	       item: item 
	     });
	     Api.create(item).then(function(created) {
	        AppDispatcher.dispatch({
	          actionType: 'created',
	          item: item 
	        });
	     }).catch(function(error) {
	        AppDispatcher.dispatch({
	          actionType: 'create_failed',
	          error: error 
	        });
	     })
	
	  }
	};
	
	module.exports = AppActions;


/***/ },
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 43 */,
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 45 */,
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 47 */,
/* 48 */,
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(38);
	
	function idGenerator() {
	  var cache={};
	  return function(prefix) {
	    if(cache[prefix] == null) {
	      cache[prefix] = 0;
	    } else {
	      cache[prefix] += 1;
	    }
	    return prefix+cache[prefix];
	  }  
	}
	
	var AnswerRadioInput = module.exports = React.createClass({displayName: "module.exports",
	  
	  propTypes: {
	    id: React.PropTypes.string, 
	    name: React.PropTypes.string.isRequired,
	    label: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string.isRequired,
	    checked: React.PropTypes.bool,
	    onChanged: React.PropTypes.func.isRequired
	  },
	  getDefaultProps: function() {
	    return {
	      id: null,
	      checked: false
	    };
	  },
	  idGenerator: idGenerator(),
	  getInitialState: function() {
	    var id = this.props.id ? this.props.id : this.idGenerator('radio-');
	    return {
	      checked: !!this.props.checked,
	      id: id,
	      name: id
	    };
	  },
	  handleChange: function(e) {
	    var checked = e.target.checked;
	    if(checked) {
	      this.props.onChanged(this.props.index)
	    }
	  },
	  render: function() {
	    return (
	      React.createElement("div", {className: "radio"}, 
	        React.createElement("label", {htmlFor: this.state.id}, 
	          React.createElement("input", {type: "radio", 
	              name: this.props.name, 
	              id: this.state.id, 
	              value: this.props.value, 
	              checked: this.props.checked, 
	              onChange: this.handleChange}), 
	          this.props.label
	        )
	      )
	    ); 
	  }
	});


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(38);
	
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
	      React.createElement("div", {className: "input-group"}, 
	        React.createElement("span", {className: "input-group-addon"}, 
	          React.createElement("input", {type: "checkbox"})
	        ), 
	        React.createElement("input", {
	          className: "form-control", 
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


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher = __webpack_require__(65).Dispatcher;
	
	module.exports = new Dispatcher();


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	
	  create: function(item) {
	    return new Promise(function(resolve,reject) {
	      setTimeout(function() {
	        resolve(item);
	      }, 2000);
	    });
	  }
	}


/***/ },
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ },
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(72)


/***/ },
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */
	
	"use strict";
	
	var invariant = __webpack_require__(75);
	
	var _lastID = 1;
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };
	
	
	module.exports = Dispatcher;


/***/ },
/* 73 */,
/* 74 */,
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ }
]);
//# sourceMappingURL=app.js.map