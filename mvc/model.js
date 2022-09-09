import Api from './api.js'
import View from './view.js'

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

export default Model;