module.exports = {

  create: function(item) {
    return new Promise(function(resolve,reject) {
      setTimeout(function() {
        resolve(item);
      }, 2000);
    });
  }
}
