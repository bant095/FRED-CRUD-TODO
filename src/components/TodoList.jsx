import React from 'react';

export const TodoList = (props) => {
  const { id, title, created_at, handleDelete } = props;
  return (
    <div
      id='task'
      className='group flex flex-row items-center justify-between border-b border-[1px] hover:bg-green-500 hover:text-white p-3 m-2'
    >
      <a href={`/${id}`}>{title}</a>
      <div className='hidden group-hover:flex'>
        <button onclick="handleEditMode('${todo.id}')">
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5 '
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10 '
            />
          </svg>
        </button>
        <button
          // onclick="(deleteTodo('${todo.id}'))"
          onClick={() => handleDelete(id)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoList;
