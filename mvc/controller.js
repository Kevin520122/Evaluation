import Model from './model.js';
import View from './view.js';

// * ~~~~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~~~~
const Controller = ((model, view) => {
  const state = new model.State();
  const deleteTodo = () => {
    const todocontainer = document.querySelector(view.domstr.todocontainer);
    // const deletebtn = document.querySelector('.deletebtn');

    // deletebtn.addEventListener('click', (event) => {
    //   state.todolist = state.todolist.filter(
    //     (todo) => +todo.id !== +event.target.id
    //   );
    //   model.deleteTodo(event.target.id);
    // });
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
    undo(), deleteDone();
    editDone();
  };

  return { bootstrap };
})(Model, View);

export default Controller;
