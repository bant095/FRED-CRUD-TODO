export const sortTodosByCreated_At = (todos) => {
  return todos.sort((a, b) =>
    a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
  );
};
