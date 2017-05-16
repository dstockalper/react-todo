var React     = require('react');
var {connect} = require('react-redux');  // Sepcify what pieces of state we want this component to have.  'connect' is the companion fcn to the Provider component
import Todo from 'Todo';

export var TodoList = React.createClass({

  render: function() {
    var {todos} = this.props;

    var renderTodos = () => {
      if(todos.length === 0) {
        return (
          <p className="container__message">Nothing to do</p>
        );
      }
      return todos.map((todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        )
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    );
  }
});

// export default is an ES6 feature.  Gets called with 'import'
export default connect( // Enable TodoList component to request store info
  (state) => {
    return {
      todos: state.todos // todos will now be set on the props for our component (TodoList)
    };
  }
)(TodoList);
