var $ = require('jQuery');

module.exports = {
  setTodos: function(todos) {
    if($.isArray(todos)) {
      localStorage.setItem('todos', JSON.stringify(todos)); // Stringify the array because localStorage can only handle strings
      return todos;
    }

    // undefined gets returned by default
  },
  getTodos: function() {
    var stringTodos = localStorage.getItem('todos');
    var todos = [];
    // Use JSON.parse to turn string back into array / obj.  But JSON.parse can fail if data is not valid, so we use a try-catch
    try {
      todos = JSON.parse(stringTodos);
    } catch(e) {
      // Fires if there's an error inside try
    }

    return $.isArray(todos) ? todos : [];

  },
}
