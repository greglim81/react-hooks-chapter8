import React, { useReducer} from 'react';
import ToDoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid';

const todosInitialState = { 
  todos:[{ id:1, text: "finishing writing hooks chapter"},
    { id:2, text: "play with kids"},
    { id:3, text: "read bible"}
  ]
};

export const TodosContext = React.createContext()

function App (){
  const [state, dispatch] = useReducer(todosReducer,todosInitialState)

  return (
    <TodosContext.Provider value={{state,dispatch}}>      
      <ToDoList />
    </TodosContext.Provider>    
  )
}

function todosReducer(state, action){ 
  switch(action.type){     
    case 'add':
      const newToDo = {id: uuidv4(), text: action.payload}
      const addedToDos = [...state.todos,newToDo]
      return {...state,todos:addedToDos}
    case 'delete':
      const filteredTodoState = state.todos.filter( todo => todo.id !== action.payload.id)
      return {...state, todos: filteredTodoState}
    case 'edit':   
      const updatedToDo = {...action.payload} 
      const updatedToDoIndex = state.todos.findIndex(t => t.id === action.payload.id)
      const updatedToDos = [
        ...state.todos.slice(0,updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];
      return {...state, todos: updatedToDos}      
    default:
      return todosInitialState
  }
}

export default App;
