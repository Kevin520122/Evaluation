import Model from './model.js';
import View from './view.js';

// * ~~~~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~~~~
const Controller = ((model, view) => {
  const state = new model.State();
  const getTodo = (id) => {
    const state = new Model.State();
    let res = '';
    state.todolist.forEach((todo) => {
      if (todo.id === id) {
        res = todo.title;
      }
    });
    return res;
  };

  const deleteTodo = () => {
    const todocontainer = document.querySelector(view.domstr.todocontainer);
    todocontainer.addEventListener('click', (event) => {
      if (event.target.className === 'deletebtn') {
        state.todolist = state.todolist.filter(
          (todo) => +todo.id !== +event.target.id
        );
        model.deleteTodo(event.target.id);
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
    const edit_done = document.getElementById("submit_edit")
    todocontainer.addEventListener('click', (event) => {
      if (event.target.className === 'fa fa-edit') {
        const cur = state.todolist.find((todo) => +todo.id === +event.target.id)
        const tmp = view.editTmp(state.todolist, event.target.id)
        view.render(todocontainer, tmp)

        
       
      }
    });

    // edit_done.addEventListener("click", (event) => {
    //   const editbox = document.querySelector("#editbox");
    //   cur.title = editbox.value
    //   state.todolist = state.todolist.forEach((todo) => {
    //     if(+todo.id === +cur.id){
    //       todo.title = editbox.value
    //     }
    //   })
    //   model.editTodo(cur.id, cur)

    // })
    
  };

  const completeTodo = async () => {
    const todocontainer = document.querySelector(view.domstr.todocontainer);
    todocontainer.addEventListener('click', async (event) => {
      if (event.target.tagName === 'svg') {
        console.log('finish');
        const cur = state.todolist.find((todo) => +todo.id === +event.target.id)
        console.log(cur)
        //Remove todo from pending list
        state.todolist = state.todolist.filter(
          (todo) => +todo.id !== +event.target.id
        );
        await model.deleteTodo(event.target.id);
        //Add todo in completed list
        
        const todo = new model.Todo(cur.title);
        todo.completed = true
        await model.addDone(todo).then((todofromBE) => {
          state.completedlist = [todofromBE, ...state.completedlist];
        });
       
      }
    });
  };

  const undo = async () => {
    const completed_container = document.querySelector(view.domstr.completed_container);
    completed_container.addEventListener('click', async (event) => {
      if (event.target.tagName === 'svg') {
       
        const cur = state.completedlist.find((todo) => +todo.id === +event.target.id)
        console.log(cur)
        //Remove todo from completed list
        state.completedlist = state.completedlist.filter(
          (todo) => +todo.id !== +event.target.id
        );
        await model.deleteDone(event.target.id);
        //Add todo in pending list
        const todo = new model.Todo(cur.title);
        todo.completed = false
        await model.addTodo(todo).then((todofromBE) => {
          state.todolist = [todofromBE, ...state.todolist];
        });
       
      }
    });
  }

  const init =  () => {
     model.getTodos().then((todos) => {
      state.todolist = todos.reverse();
    });
     model.getCompleted().then((done) => {
      console.log(done)
      state.completedlist = done.reverse();
    });
  };

  const  bootstrap =  () => {
     init();
    deleteTodo();
    addTodo();
    editTodo();
    completeTodo();
    undo()
  };

  return { bootstrap };
})(Model, View);

export default Controller;
