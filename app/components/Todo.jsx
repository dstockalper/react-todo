var React     = require('react');
var {connect} = require('react-redux');
var moment    = require('moment');
var actions   = require('actions');

// export var Todo = React.createClass({ // Even though we're exporting the connectified component below, we'll still export this component as-is for testing
//   render: function() {
//     var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
//     var todoClassName = completed ? 'todo todo-completed' : 'todo';
//     var renderDate = () => {
//       var message   = 'Created ';
//       var timestamp = createdAt;
//
//       if(completed) {
//         message = 'Completed ';
//         timestamp = completedAt;
//       }
//
//       return message + moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a');
//     };
//     return (
//       <div className={todoClassName} onClick={() => {
//           dispatch(actions.startToggleTodo(id, !completed));
//         }}>
//         <div>
//           <input type="checkbox" checked={completed}/>
//         </div>
//         <div>
//           <p>{text}</p>
//           <p className="todo__subtext">{renderDate()}</p>
//         </div>
//
//
//       </div>
//     );
//   }
// });
//
// export default connect()(Todo); // The connectified component will be returned now when calling import ConnectedTodo ;


export class Todo extends React.Component { // Even though we're exporting the connectified component below, we'll still export this component as-is for testing

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    var {dispatch, id, completed} = this.props;
    dispatch(actions.startToggleTodo(id, !completed));
  }

  render() {
    var {text, completed, createdAt, completedAt} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';

    var renderDate = () => {
      var message   = 'Created ';
      var timestamp = createdAt;

      if(completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do, YYYY @ h:mm a');
    };

    return (
      <div className={todoClassName} onClick={this.onClick}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }
  
};

export default connect()(Todo); // The connectified component will be returned now when calling import ConnectedTodo ;
