import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';
import { showConfirmModal } from '../utils/showModal';
import TodoLoader from '../components/TodoLoader';
import TodoList from '../components/TodoList';

const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME;

function TodoDashboard() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [formError, setFormError] = useState({
    isError: false,
    errorMesssage: null,
  }); // success, warning, danger

  //having a state for an id to update
  const [todoIdToUpdate, settodoIdToUpdate] = useState(null);

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
  //DELETE TODO FUNCTION
  const handleDelete = (id) => {
    const deleteTodo = () => {
      //Get todo ls [Local Storage]
      const todo_db = getLocalStorage(todo_ls_name);

      //filter out todos that doesn't match the id
      const new_todo_db = todo_db.filter((todo) => todo.id !== id);

      //set the new todos without the todo that matches the id to the ls
      setLocalStorage(todo_ls_name, new_todo_db); //calling the function from our local storage
      fetchTodos();
    };

    showConfirmModal({
      title: 'Delete Todo!',
      text: 'Do you want to delete this todo?',
      icon: 'warning',
      confirmButtonText: 'Yes!',
      showCancelButton: true,
      cb: deleteTodo,
    });
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

  //////////////////////
  // EDIT TODO FUNCTION
  const handleEditMode = (id) => {
    setIsEditMode(true);
    settodoIdToUpdate(id); //id from the state
    const todo_db = getLocalStorage(todo_ls_name);
    const todo_to_update = todo_db.find((todo) => todo.id === id);

    if (!todo_to_update) {
      return;
    }
    setTodoInput(todo_to_update.title);

    // todoInput.value = todo_to_update.title;

    //To hide and update btn

    // updateTodoBtn.classList.remove('hidden'); //show update on todo btn
    // updateTodoBtn.setAttribute('todo_id_to_update', id);

    //  const addTodoBtn = document.querySelector('#add_todo_btn');
    // addTodoBtn.classList.add('hidden'); //hide & add todo btn
  };

  /////UPDATE TODO ///////////////
  const updateTodo = (e) => {
    e.preventDefault();
    //To validate our input and make a good ux
    if (!todoInput) {
      return setFormError({
        isError: true,
        errorMesssage: 'Todo title cannot be empty',
      });
    }

    // const todo_id_to_update = updateTodoBtn.getAttribute('todo_id_to_update');
    const todo_db = JSON.parse(localStorage.getItem(todo_ls_name)) || [];
    const updated_todo_db = todo_db.map((todo) => {
      //map through our todo_db
      if (todo.id === todoIdToUpdate) {
        return { ...todo, title: todoInput };
      } else {
        return todo;
      }
    });

    setLocalStorage(todo_ls_name, updated_todo_db); //UPDATE STORAGE
    fetchTodos(); //FETCH TODO, SO THAT THE UI WILL UPDATE
    setTodoInput(''); //to clear the form and have a good UX. users can retype their input
    // updateTodoBtn.classList.add('hidden');
    // const addTodoBtn = document.querySelector('#add_todo_btn');
    // addTodoBtn.classList.remove('hidden'); //show & add todo btn
    setIsEditMode(false);
    // showConfirmModel({
    //   title: 'Todo Updated',
    //   icon: 'success',
    //   confirmButtonText: 'Okay',
    // });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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

          {isEditMode ? (
            <button
              className=' bg-slate-500 text-white py-2 px-4 rounded-md m-2'
              onClick={updateTodo}
              type='submit'
            >
              Update
            </button>
          ) : (
            <button
              onClick={createTodo}
              type='submit'
              className='bg-green-500 text-white py-2 px-4 rounded-md m-2'
            >
              Add
            </button>
          )}
        </form>
        {formError && formError.isError && (
          <span className='text-red-400 text-xs text-left p-2'>
            {formError.errorMesssage}
          </span>
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
              {/* passing as a props */}
              {todos.map(({ title, id, created_at }) => {
                return (
                  <TodoList
                    title={title}
                    id={id}
                    created_at={created_at}
                    key={`todo-list-${id}`}
                    handleDelete={handleDelete}
                    handleEditMode={handleEditMode}
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

export default TodoDashboard;
