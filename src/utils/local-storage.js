//GET ITEM
export const getLocalStorage = (name) => {
  if (!name) {
    throw new Error('Local Storage name is missing...');
  }
  return JSON.parse(localStorage.getItem(name)) || [];
};

//Set ITEM
export const setLocalStorage = (name, newData) => {
  if (!name) {
    throw new Error('LocalStorage is missing...');
  }

  if (!newData) {
    throw new Error('Data is missing...');
  }

  localStorage.setItem(name, JSON.stringify(newData));
};
