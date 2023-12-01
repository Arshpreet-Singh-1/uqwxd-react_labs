// Import React , useState and useEffect from React
import React, { useState, useEffect } from "react";
// Import the CSS file for styling
import "./App.css";

// Functional component named App
const App = () => {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);
  // State to manage the id of the todo being edited
  const [todoEditing, setTodoEditing] = useState(null);

  // useEffect to load todos from localStorage when the component mounts
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  // useEffect to save todos to localStorage whenever the todos state changes
  useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  // Function to handle form submission when adding a new todo
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };

    // Check if the todo text is not empty before adding it to the list
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
    } else {
      // Show an alert if the user tries to add an empty task
      alert("Enter Valid Task");
    }

    // Clear the input field after adding the todo
    document.getElementById('todoAdd').value = "";
  }

  // Function to delete a todo based on its id
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // Function to toggle the completion status of a todo
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // Function to submit edits for a todo
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        // Update the text of the todo with the new value from the input field
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
    });

    // Update the todos list and exit edit mode
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  // JSX for rendering the component
  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      {/* Form for adding new todos */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="todoAdd"
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Mapping through the todos list and rendering each todo */}
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            {/* Checkbox for toggling completion status */}
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {/* Display text or input field based on edit mode */}
            {todo.id === todoEditing ? (
              <input
                type="text"
                id={todo.id}
                defaultValue={todo.text}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {/* Button for submitting edits or entering edit mode */}
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}
            {/* Button for deleting a todo */}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Export the App component as the default export
export default App;

