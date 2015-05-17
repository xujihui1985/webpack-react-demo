var React = require('react');

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

var AnswerRadioInput = module.exports = React.createClass({
  
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
      <div className="radio">
        <label htmlFor={this.state.id}>
          <input type="radio" 
              name={this.props.name}
              id={this.state.id}
              value={this.props.value}
              checked={this.props.checked}
              onChange={this.handleChange}/>
          {this.props.label}
        </label>
      </div>
    ); 
  }
});
