var AppDispatcher = require('./AppDispatcher');
var Api = require('./API');

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
