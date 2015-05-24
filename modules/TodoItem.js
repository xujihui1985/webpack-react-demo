var React = require('react');

var TodoItem = React.createClass({
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
      <div className="input-group">
        <span className="input-group-addon">
          <input type="checkbox" />
        </span>
        <input 
          className="form-control"
          type="text" 
          value={this.props.todo.val}
          onChange={this._onTextChanged}
        />
        <span className="input-group-btn">
          <button onClick={this._onDelete} className="btn btn-danger">
            <i className="glyphicon glyphicon-remove"></i>
            Delete
          </button>
        </span>
      </div>
    ); 
  }
});

module.exports = TodoItem;
