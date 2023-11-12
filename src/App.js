import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, setLocalStorage } from './utils/local-storage';
import { TodoLoader } from './components/TodoLoader';
import { TodoList } from './components/TodoList';

import './App.css';

const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;

function App() {
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [formError, setFormError] = useState({
    isError: false,
    errorMesssage: null,
  }); // success, warning, danger

  const createTodo = () => {
    try {
      if (!todoInput) {
        setFormError({
          isError: true,
          errorMesssage: 'Please provide a todo title',
        });

        setTimeout(() => {
          setFormError({
            isError: false,
            errorMesssage: null,
          });
        }, 5000);
      }

      // Creating TodoList using a Library of UUID
      const newTodo = {
        id: uuidv4(),
        title: todoInput,
        created_at: Date.now(),
      };

      //assigning our .env in a varaible instead of repearing it
      const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;

      //check for ls
      const todos = getLocalStorage(todo_ls_name);

      //add new todo_db array
      const new_todos = [...todos, newTodo];

      // add to ls with set
      setLocalStorage(todo_ls_name, new_todos);

      //     resetInput();
      //     fetch_todoist();
    } catch (error) {
      //     showError(error.message);
    }
  };

  //////////////////////
  //Read todo
  const fetchTodos = () => {
    const _todos = getLocalStorage(todo_ls_name);
    setTodos(_todos);
    setTimeout(() => {
      setLoadingTodos(false);
    }, 2000);
  };
  // const todo_Container = document.querySelector('#task_log');
  //const noTodo = todo_db.length === 0;
  // if (noTodo) {
  //   todo_Container.innerHTML = `<p class="text-slate-400">Your todo list will appear here</p>`;
  //   return;
  // }
  // const sortedTodos = sortTodoByCreated_At(todo_db);

  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos);
  return (
    <div>
      <header className='mt-10 p-4 max-w-lg mx-auto bg-green-500 text-white'>
        <h2 className='text-center text-3xl'>
          <span className='text-white font-bold'>FRED</span> TODO
        </h2>
      </header>
      <main className='bg-white shadow-lg max-w-lg mx-auto p-2'>
        <form className='flex flex-col sm:flex-row justify-between'>
          <input
            type='text'
            name='user-input'
            placeholder='What are you doing today?'
            className='outline-none border py-2 px-4 m-2 sm:w-[80%] rounded-md'
            id='todo_input'
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button
            onClick={createTodo}
            className='bg-green-500 text-white py-2 px-4 rounded-md m-2'
            id='add_todo_btn'
          >
            Add
          </button>
          <button
            // onclick={updateTodo}
            className='hidden bg-slate-500 text-white py-2 px-4 rounded-md m-2'
            id='update_todo_btn'
          >
            Update
          </button>
        </form>
        {formError && formError.isError && (
          <span className='text-left p-2'>{formError.errorMesssage}</span>
        )}
        {!loadingTodos && todos.length === 0 && (
          <p className='text-center text-slate-500'>
            No todos yet. They'll will appear here once you add them.
          </p>
        )}

        <section className='mt-5'>
          {loadingTodos ? (
            <section className='flex flex-col gap-2'>
              <TodoLoader />
              <TodoLoader />
              <TodoLoader />
            </section>
          ) : (
            <>
              {todos.map(({ title, id, created_at }) => {
                return (
                  <TodoList
                    title={title}
                    id={id}
                    created_at={created_at}
                    key={`todo-list-${id}`}
                  />
                );
              })}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
