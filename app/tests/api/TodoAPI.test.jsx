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

  });
});
