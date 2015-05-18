var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


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
