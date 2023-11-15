import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLocalStorage } from '../utils/local-storage';

const SingleTodoPreview = () => {
  const { todo_id } = useParams();
  const [todo, setTodo] = useState(null);

  //useEffect Dependency
  useEffect(() => {
    const getTodoById = () => {
      const todo_db = getLocalStorage('todo_ls_name');
      const currentTodo = todo_db.find((todo) => todo.id === todo_id);
      setTimeout(() => {
        setTodo(currentTodo);
      }, 2000);
    };
    //To call the getTodoById when the component is run with useEffect
    if (todo_id) {
      getTodoById();
    }
  }, [todo_id]);

  if (!todo) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {/* Header */}
      <header className='px-5 py-4 bg-green-400 text-center text-white border-slate-400 mt-5 max-w-lg mx-auto'>
        <h1 className='text-3xl font-medium'>Fred Todo</h1>
      </header>

      {/* MAIN BODY */}
      <main className='px-5 max-w-lg mx-auto bg-white shadow-lg h-[300px] pt-8'>
        <section id='todo_preview_container'>
          <div>
            <section className='flex justify-between items-center'>
              <h3 className='text-xl font-semibold'>{todo.title}</h3>
              <div className='flex items-center gap-2'>
                <button
                // onclick='handleEditMode()'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 text-slate-600 hover:text-slate-800'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10 '
                    />
                  </svg>
                </button>
                <button
                // onclick='deleteTodo()'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-5 h-5 text-slate-600 hover:text-slate-800'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </button>
              </div>
            </section>
            <section className='mt-3'>
              <p className='text-slate-700'>{todo.description}</p>
              <section className='mt-3'>
                <span className='text-sm'>{todo.created_at}</span>
                <span className='max-1'>·</span>
                <span className='bg-red-400 text-sm text-white rounded-full px-1 py-0.5'>
                  Pending
                </span>
              </section>
            </section>
            <section classname='mt-10'>
              <Link
                to='/'
                classname='flex item-center gap-2 max-w-lg text-slate-500 hover:text-green-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokewidth='1.5'
                  stroke='currentColor'
                  classname='w-4 h-4'
                >
                  <path
                    strokelinecap='round'
                    strokelinejoin='round'
                    d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                  />
                </svg>
                <span classname='text-sm'>View all Todos</span>
              </Link>
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleTodoPreview;
