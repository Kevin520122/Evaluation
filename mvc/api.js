// * ~~~~~~~~~~~~~~~~~~~ Api ~~~~~~~~~~~~~~~~~~~
const Api = (() => {
  //const baseUrl = "https://jsonplaceholder.typicode.com";
  const baseUrl = 'http://localhost:3000';
  const todopath = 'todos';
  const completed = "complete_list"

  const getTodos = () =>
    fetch([baseUrl, todopath].join('/')).then((response) => response.json());

  const getCompleted = () => 
    fetch([baseUrl, completed].join('/')).then((response) => response.json());
  

  const deleteTodo = (id) =>
    fetch([baseUrl, todopath, id].join('/'), {
      method: 'DELETE',
    });

  const deleteDone = (id) => fetch([baseUrl, completed, id].join('/'), {
    method: 'DELETE',
  });

  const addTodo = (todo) =>
    fetch([baseUrl, todopath].join('/'), {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());

  const addDone = (done) => 
  fetch([baseUrl, completed].join('/'), {
    method: 'POST',
    body: JSON.stringify(done),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());

  const editTodo = (id, todo) => 
    fetch([baseUrl, todopath], id.join('/'), {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
  

  const editDone = (id, done) => 
  fetch([baseUrl, completed].join('/'), {
    method: 'PUT',
    body: JSON.stringify(done),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())

  return {
    getTodos,
    deleteTodo,
    addTodo,
    editTodo,
    getCompleted,
    deleteDone,
    editDone,
    addDone
  };
})();

export default Api;
