var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  // use Mocha test lifecycle method to run before each test
  beforeEach(() => {
    localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('setTodos', () => {
    it('should set valid todos array', () => {
      var todos = [
        {
          id: 23,
          text: 'test all files',
          completed: false
        }
      ]
      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);  // toEqual checks that they are same objects / values IN MEMORY.  toBe checks that values are equal
    });
  });

  it('should not set invalid todos array', () => {
    var badTodos = {a: 'b'}
    TodoAPI.setTodos(badTodos);
    expect(localStorage.getItem('todos')).toBe(null);
  });

  describe('getTodos', () => {
    it('should return emtpy array for bad localStorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });

    it('should return todos if valid array in localStorage', () => {
      var todos = [
        {
          id: 23,
          text: 'test all files',
          completed: false
        }
      ];

      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });

    describe('filter todos', () => {
      var todos = [
        {
          id: 1,
          text: 'some text here',
          completed: true
        },
        {
          id: 2,
          text: 'other text here',
          completed: false
        },
        {
          id: 3,
          text: 'some text here',
          completed: true
        }
      ];

      it('should return all items if showCompleted is true', () => {
        var filteredTodos = TodoAPI.filterTodos(todos, true, '');
        expect(filteredTodos.length).toBe(3);
      });

      it('should return only non-completed items if showCompleted is false', () => {
        var filteredTodos = TodoAPI.filterTodos(todos, false, '');
        expect(filteredTodos.length).toBe(1);
      });

      it('should sort by completed status', () => {
        var filteredTodos = TodoAPI.filterTodos(todos, true, '');
        expect(filteredTodos[0].completed).toBe(false);
      });

      it('should filter todos by searchText', () => {
        var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
        expect(filteredTodos.length).toBe(2);
      });

      it('should return all todos if searchText is empty', () => {
        var filteredTodos = TodoAPI.filterTodos(todos, true, '');
        expect(filteredTodos.length).toBe(3);
      });

    });

  });
});
