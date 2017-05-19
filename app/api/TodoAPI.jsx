var $ = require('jQuery');

module.exports = {
  // For localStorage:
  // setTodos: function(todos) {
  //   if($.isArray(todos)) {
  //     localStorage.setItem('todos', JSON.stringify(todos)); // Stringify the array because localStorage can only handle strings
  //     return todos;
  //   }
  //
  //   // undefined gets returned by default
  // },
  // getTodos: function() {
  //   var stringTodos = localStorage.getItem('todos');
  //   var todos = [];
  //   // Use JSON.parse to turn string back into array / obj.  But JSON.parse can fail if data is not valid, so we use a try-catch
  //   try {
  //     todos = JSON.parse(stringTodos);
  //   } catch(e) {
  //     // Fires if there's an error inside try
  //   }
  //
  //   return $.isArray(todos) ? todos : [];
  // },
  filterTodos: function(todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => { // Filter is built-in array method.  Takes a callback fcn and item is kept in array if return true;
      return !todo.completed || showCompleted;
    });

    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      var text = todo.text.toLowerCase();
      if(searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1) {
        return true;
      }
    });

    // Sort by completed
    filteredTodos.sort((a, b) => { // Sort is a built-in array method that works in place
      // -1 to tell sort method that a should come before b, 1 to tell sort that b before a, 0 for neither
      if(!a.completed && b.completed) {
        return -1;
      } else if(a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
}
