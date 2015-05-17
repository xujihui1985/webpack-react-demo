var React = require('react');
var AnswerRadioInput = require('./AnswerRadioInput');

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

var AnswerMultipleChoiceQuestion = React.createClass({
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
        <AnswerRadioInput 
          id={"choice-"+i}
          name="radio"
          label={choice.label} 
          value={choice.value}
          checked={choice.checked}
          index={i}
          onChanged={this.handleChanged}
        />
      )
    }.bind(this)) 
  },
  render: function() {
    return (
      <div className="form-group">
        <label 
              className="item-label"
              htmlFor={this.state.id}>
            {this.props.label}
        </label>
        <div className="survey-item-content">
          {this.renderChoises()}
        </div>
      </div>
    ); 
  
  }
});

module.exports = AnswerMultipleChoiceQuestion;
