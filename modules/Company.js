var React = require('react');
var Navigation = require('react-router').Navigation;
var AnswerMultipleChoiceQuestion = require('./AnswerMultipleChoiceQuestion');

var Home = React.createClass({
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
        <div>
          <button onClick={this.goBack}>go back</button>
          <button onClick={function() {this.transitionTo('home')}.bind(this)}>go to home</button>
        </div>
      );
    }
    return (
      <div className="company">
        Company
        <AnswerMultipleChoiceQuestion 
          label="multiple-choice" 
          choices={this.state.choices}
          onCompleted={this.choiceType}/>
        {goback}
      </div>
    );
  }
});

module.exports = Home;
