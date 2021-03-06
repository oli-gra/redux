import { Todo } from './type'
import { v1 as uuid } from 'uuid'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const CREATE_TODO = 'CREATE_TODO'
const EDIT_TODO = 'EDIT_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const DELETE_TODO = 'DELETE_TODO'
const SELECT_TODO = 'SELECT_TODO'

interface CreateTodoActionType {
    type: typeof CREATE_TODO
    payload: Todo
}
export const CreateTodoActionCreator = ({desc}: {
    desc: string
}): CreateTodoActionType => {
    return {
        type: CREATE_TODO,
        payload: {
            id: uuid(),
            desc,
            isComplete: false
        }
    }
}

interface EditTodoActionType {
    type: typeof EDIT_TODO
    payload: { id: string, desc: string }
}

export const editTodoActionCreator = ({id, desc}: {
    id : string,
    desc : string
}): EditTodoActionType => {
    return {
        type: EDIT_TODO,
        payload: {id, desc}
    }
}

interface ToggleTodoActionType {
    type: typeof TOGGLE_TODO
    payload: { id: string, isComplete: boolean }
}
export const toggleTodoActionCreator = ({ id, isComplete } : {
    id: string, isComplete: boolean,
}): ToggleTodoActionType => {
    return {
        type: TOGGLE_TODO,
        payload: { id, isComplete}
    }
}

interface DeleteTodoActionType {
    type: typeof DELETE_TODO,
    payload: { id: string }
}
export const deleteTodoActionCreator = ({ id }: {
    id: string
}): DeleteTodoActionType => {
    return {
        type: DELETE_TODO,
        payload: {id}
    }
}

interface SelectTodoActionType {
    type: typeof SELECT_TODO;
    payload: { id: string };
}
export const selectTodoActionCreator = ({ id }: { id: string }): SelectTodoActionType =>
{
    return {
        type: SELECT_TODO,
        payload: { id }
    }
}


// REDUCER
const todoInitialState: Todo[] = [
    {
      id: uuid(),
      desc: "Learn React",
      isComplete: true
    },
    {
      id: uuid(),
      desc: "Learn Redux",
      isComplete: true
    },
    {
      id: uuid(),
      desc: "Learn Redux-ToolKit",
      isComplete: false
    }
];
  
type TodoActionTypes = CreateTodoActionType | EditTodoActionType | ToggleTodoActionType | DeleteTodoActionType
const todoReducer = (
    state: Todo[] = todoInitialState,
    action: TodoActionTypes
) => {
    switch (action.type) {
        case CREATE_TODO: {
            return [...state, action.payload]
        }
        case EDIT_TODO: {
            const {payload} = action
            return state.map(todo => todo.id === payload.id ? { ...todo, desc: payload.desc } : todo)
        }
        case TOGGLE_TODO: {
            const {payload} = action
            return state.map(todo => todo.id === payload.id ? { ...todo, isComplete: payload.isComplete } : todo)
        }
        case DELETE_TODO: {
            return state.filter(todo => todo.id !== action.payload.id)
        }
        default: {
            return state
        }
    }
}

type SelectTodoActionTypes = SelectTodoActionType
const selectedTodoReducer = (
    state: string | null = null,
    action: SelectTodoActionTypes
) => {
    switch (action.type) {
        case SELECT_TODO: {
            return action.payload.id
        }
        default: {
            return state
        }
    }
}

const counterReducer = (
    state: number = 0,
    action: TodoActionTypes
) => {
    switch (action.type) {
        case CREATE_TODO: {
            return state + 1
        }
        case EDIT_TODO: {
            return state + 1
        }
        case TOGGLE_TODO: {
            return state + 1
        }
        case DELETE_TODO: {
            return state + 1
        }
        default: {
            return state
        }
    }
}

const reducers = combineReducers({
    todos: todoReducer,
    selectedTodo: selectedTodoReducer,
    counter: counterReducer
})

// const compose = composeWithDevTools({
//     realtime: true,
//     name: 'redux',
//     hostname: 'localhost',
//     port: 3000
//   })

export default createStore(reducers, 
    applyMiddleware(thunk, logger)
)