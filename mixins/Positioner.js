var React = require('react');

var Timeout = function(timeout) {

  return {
    // this will change the state of host component
    //getInitialState: function() {
      //return {
        //position: 0
      //};
    //},
    //resolveAnimationFrame: function() {
      //var timestamp = new Date(); 
      //var timeRemaining = Math.max(0, this.props.animationCompleteTimestamp - timestamp);
      //if(timeRemaining > 0) {
        //this.setState({position: timeRemaining});
      //}
    //},
    componentDidMount: function() {
      this.__timeout = setTimeout(this.onTimeout, timeout) ;
    }

    componentWillUnMount: function() {
      clearInterval(this.__timeout);
    }
    //componentWillUpdate: function() {
      //if(this.props.animationCompleteTimestamp) {
        //requestAnimationFrame(this.resolveAnimationFrame);
      //}
    //},
    //render: function() {
      //var divStyle = {left: this.state.position};

      //return (<div style={divStyle}>This will animate</div>);
    //}
  };
};
