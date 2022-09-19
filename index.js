// Import stylesheets
//import Controller from 'mvc/controller.js'// * ~~~~~~~~~~~~~~~~~~~ Api ~~~~~~~~~~~~~~~~~~~
const Api = (() => {
  //const baseUrl = "https://jsonplaceholder.typicode.com";
  const baseUrl = 'http://localhost:3000';
  const todopath = 'todos';
  const completed = 'complete_list';

  const getTodos = () =>
    fetch([baseUrl, todopath].join('/')).then((response) => response.json());

  const getCompleted = () =>
    fetch([baseUrl, completed].join('/')).then((response) => response.json());

  const deleteTodo = (id) =>
    fetch([baseUrl, todopath, id].join('/'), {
      method: 'DELETE',
    });

  const deleteDone = (id) =>
    fetch([baseUrl, completed, id].join('/'), {
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
    fetch([baseUrl, todopath, id].join('/'), {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());

  const editDone = (id, done) =>
    fetch([baseUrl, completed].join('/'), {
      method: 'PUT',
      body: JSON.stringify(done),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json());

  return {
    getTodos,
    deleteTodo,
    addTodo,
    editTodo,
    getCompleted,
    deleteDone,
    editDone,
    addDone,
  };
})();

// * ~~~~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~~~~
const View = (() => {
    const domstr = {
      todocontainer: '#todolist_container',
      inputbox: '.todolist__input',
      submit_btn: '#submit_btn',
      completed_container: '#completedlist_container',
    };
  
    const render = (ele, tmp) => {
      ele.innerHTML = tmp;
    };
    const editTmp = (arr, curId) => {
      let tmp = '';
      arr.forEach((todo) => {
        if (+todo.id === +curId) {
          tmp += `
          <li>
            <input id="editbox", placeholder="${todo.title}">
            <button id="submit_edit">submit</button>    
          </li>
        `;
        } else {
          tmp += `
                  <li>
                  <div class="text-area">
                      <span>${todo.title}</span>
                  </div>
                  <div class="button-area">
                      <button id=${todo.id} class="deletebtn">Delete</button>
                      <button id=${todo.id} class="editbtn">Edit</button>
                      <button id=${todo.id} class="finish">Done</button>
                  </div>
              </li>
          `;
        }
      });
      return tmp;
    };
  
    const editTmp2 = (arr, curId) => {
      let tmp = '';
      arr.forEach((todo) => {
        if (+todo.id === +curId) {
          tmp += `
          <li>
            <input id="editbox", placeholder="${todo.title}">
            <button id="submit_edit">submit</button>  
          </li>
        `;
        } else {
          tmp += `
          <li>
                          <button id=${todo.id} class="undo">Undo</button>
                          <div class="text-area">
                              <span>${todo.title}</span>
                          </div>
                          <button id=${todo.id} class="deletebtn">Delete</button>
                          <button id=${todo.id} class="editbtn">Edit</button>
                    
          </li>
        `;
        }
      });
      return tmp;
    };
  
    const createTmp = (arr) => {
      let tmp = '';
      arr.forEach((todo) => {
        tmp += `
          <li>
                      <div class="text-area">
                <span>${todo.title}</span>
                      </div>
                      <div class="button-area">
                          <button id=${todo.id} class="deletebtn">Delete</button>
                          <button id=${todo.id} class="editbtn">Edit</button>
                          <button id=${todo.id} class="finish">Done</button>
                              
                      </div>
  
  
              
          </li>
        `;
      });
      return tmp;
    };
  
    const createTmp_finish = (arr) => {
      let tmp = '';
      arr.forEach((todo) => {
        tmp += `
          <li>
                      <div class="text-area">
                          <span>${todo.title}</span>
                      </div>
              <button id=${todo.id} class="undo">Undo</button>
                      <button id=${todo.id} class="deletebtn">Delete</button>
                      <button id=${todo.id} class="editbtn">Edit</button>
          </li>
        `;
      });
      return tmp;
    };
  
    return {
      render,
      createTmp,
      domstr,
      createTmp_finish,
      editTmp,
      editTmp2,
    };
  })();
  
  
  
  


// * ~~~~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~~~~
const Model = ((api, view) => {
	const { getTodos, deleteTodo, addTodo, editTodo, getCompleted, addDone, deleteDone, editDone} = api;

	class Todo {
		constructor(title) {
			this.completed = false;
			this.title = title;
		}
	}

	class State {
		#todolist = [];
    #completedlist = [];

		get todolist() {
			return this.#todolist;
		}
		set todolist(newtodolist) {
			this.#todolist = newtodolist;

			const todocontainer = document.querySelector(
				view.domstr.todocontainer
			);
			const tmp = view.createTmp(this.#todolist);
			view.render(todocontainer, tmp);
		}

    get completedlist() {
			return this.#completedlist;
		}

		set completedlist(new_completedlist) {
			this.#completedlist = new_completedlist;

			const completedcontainer = document.querySelector(
				view.domstr.completed_container
			);
			const tmp = view.createTmp_finish(this.#completedlist);
			view.render(completedcontainer, tmp);
		}
	}

	return {
		getTodos,
		deleteTodo,
    addTodo,
		State,
		Todo,
    editTodo,
		getCompleted,
		addDone,
		deleteDone,
		editDone
	};
})(Api, View);

// * ~~~~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~~~~
const Controller = ((model, view) => {
    const state = new model.State();
    const deleteTodo = () => {
      const todocontainer = document.querySelector(view.domstr.todocontainer);
      console.log(todocontainer)
      todocontainer.addEventListener('click', (event) => {
        console.log(event.target.className)
        console.log(event.target)
        if (event.target.className === 'deletebtn') {
          state.todolist = state.todolist.filter(
            (todo) => +todo.id !== +event.target.id
          );
          model.deleteTodo(event.target.id);
        }
      });
    };
  
    const deleteDone = () => {
      const completed_container = document.querySelector(
        view.domstr.completed_container
      );
      completed_container.addEventListener('click', (event) => {
        if (event.target.className === 'deletebtn') {
          state.completedlist = state.completedlist.filter(
            (todo) => +todo.id !== +event.target.id
          );
          model.deleteDone(event.target.id);
        }
      });
    };
  
    const addTodo = () => {
      const inputbox = document.querySelector(view.domstr.inputbox);
      const submit_btn = document.querySelector(view.domstr.submit_btn);
      //Add enter event for input box
      inputbox.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
          const todo = new model.Todo(event.target.value);
          model.addTodo(todo).then((todofromBE) => {
            console.log(todofromBE);
            state.todolist = [todofromBE, ...state.todolist];
          });
          event.target.value = '';
        }
      });
      //Add click event for submit button
      submit_btn.addEventListener('click', (event) => {
        const todo = new model.Todo(inputbox.value);
        model.addTodo(todo).then((todofromBE) => {
          state.todolist = [todofromBE, ...state.todolist];
        });
        inputbox.value = '';
      });
    };
  
    const editTodo = () => {
      const todocontainer = document.querySelector(view.domstr.todocontainer);
      todocontainer.addEventListener('click', (event) => {
        
        if (event.target.className ==='editbtn') {
          //Locate current todo
          const cur = state.todolist.find((todo) => +todo.id === +event.target.id)
          //Locate current todo index
          const index = state.todolist.indexOf(cur)
          //re-render the page
          const tmp = view.editTmp(state.todolist, event.target.id)
          view.render(todocontainer, tmp)
  
          const edit_done = document.getElementById("submit_edit")
          edit_done.addEventListener("click", (event) => {
            const editbox = document.querySelector("#editbox");
            cur.title = editbox.value
            state.todolist[index] = cur
            const tmp = view.editTmp(state.todolist, event.target.id)
            view.render(todocontainer, tmp)
            model.editTodo(cur.id, cur)
          })
        }
      });
    };
  
    const editDone = () => {
      const completed_container = document.querySelector(
        view.domstr.completed_container
      );
  
      completed_container.addEventListener('click', (event) => {
        if (event.target.className === 'editbtn') {
          const cur = state.completedlist.find(
            (todo) => +todo.id === +event.target.id
          );
          const index = state.completedlist.indexOf(cur);
          const tmp = view.editTmp2(state.completedlist, event.target.id);
          view.render(completed_container, tmp);
          const edit_done = document.getElementById('submit_edit');
          edit_done.addEventListener('click', (event) => {
            const editbox = document.querySelector('#editbox');
            cur.title = editbox.value;
            state.completedlist[index] = cur;
            const tmp = view.editTmp2(state.completedlist, event.target.id);
            view.render(completed_container, tmp);
            model.editDone(cur.id, cur);
          });
        }
      });
    };
  
    const completeTodo = async () => {
      const todocontainer = document.querySelector(view.domstr.todocontainer);
      todocontainer.addEventListener('click', async (event) => {
        if (event.target.className === 'finish') {
          console.log(event.target);
          const cur = state.todolist.find(
            (todo) => +todo.id === +event.target.id
          );
          console.log(cur);
          //Remove todo from pending list
          state.todolist = state.todolist.filter(
            (todo) => +todo.id !== +event.target.id
          );
          await model.deleteTodo(event.target.id);
          //Add todo in completed list
  
          const todo = new model.Todo(cur.title);
          todo.completed = true;
          await model.addDone(todo).then((todofromBE) => {
            state.completedlist = [todofromBE, ...state.completedlist];
          });
        }
      });
    };
  
    const undo = async () => {
      const completed_container = document.querySelector(
        view.domstr.completed_container
      );
      completed_container.addEventListener('click', async (event) => {
        if (event.target.className === 'undo') {
          const cur = state.completedlist.find(
            (todo) => +todo.id === +event.target.id
          );
          console.log(cur);
          //Remove todo from completed list
          state.completedlist = state.completedlist.filter(
            (todo) => +todo.id !== +event.target.id
          );
          await model.deleteDone(event.target.id);
          //Add todo in pending list
          const todo = new model.Todo(cur.title);
          todo.completed = false;
          await model.addTodo(todo).then((todofromBE) => {
            state.todolist = [todofromBE, ...state.todolist];
          });
        }
      });
    };
  
    const init = () => {
      model.getTodos().then((todos) => {
        state.todolist = todos.reverse();
      });
      model.getCompleted().then((done) => {
        console.log(done);
        state.completedlist = done.reverse();
      });
    };
  
    const bootstrap = () => {
      init();
      deleteTodo();
      addTodo();
      editTodo();
      completeTodo();
      undo();
      deleteDone();
      editDone();
    };
  
    return { bootstrap };
  })(Model, View);

Controller.bootstrap();
