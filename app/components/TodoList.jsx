var React     = require('react');
var {connect} = require('react-redux');  // Sepcify what pieces of state we want this component to have.  'connect' is the companion fcn to the Provider component
import Todo from 'Todo';
var TodoAPI   = require('TodoAPI');

export var TodoList = React.createClass({

  render: function() {
    var {todos, showCompleted, searchText} = this.props;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
    var renderTodos = () => {
      if(filteredTodos.length === 0) {
        return (
          <p className="container__message">Nothing to do</p>
        );
      }
      return filteredTodos.map((todo) => {
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
    return state // ALL properties on our redux store will now be available on the props for our component (TodoList).  We could have instead specified only certain properties on the store to be available to the component
  }
)(TodoList);
