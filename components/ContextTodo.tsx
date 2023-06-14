/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
const ContextTodo = React.createContext({
  todoName: [],
  addTodo: (newText: string) => {},
  deleteTodo: (id: string) => {},
  // updatedTodo: () => {},
});

export default ContextTodo;
