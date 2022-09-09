// * ~~~~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~~~~
const View = (() => {
	const domstr = {
		todocontainer: "#todolist_container",
		inputbox: ".todolist__input",
    submit_btn: '#submit_btn',
    completed_container: '#completedlist_container'
	};

	const render = (ele, tmp) => {
		ele.innerHTML = tmp;
	};
	const editTmp = (arr, curId) => {
		let tmp = "";
		arr.forEach((todo) => {
			if(+todo.id === +curId){
				tmp += `
        <li>
          <input id="editbox", placeholder="${todo.title}">
          <button id="submit_edit">submit</button>
					
            
        </li>
      `;}else{
				tmp += `
        <li>
          <span>${todo.title}</span>
          <button class="deletebtn" id="${todo.id}">X</button>
          <div class="edit"> 
            <i class="fa fa-edit" id="${todo.id}"></i>
          </div>
          
          	<svg  class="finish1" id="${todo.id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path class="finish2" d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
					
            
        </li>
      `;
			}
		})
			return tmp;
	}

	const editTmp2 = (arr, curId) => {
		let tmp = "";
		arr.forEach((todo) => {
			if(+todo.id === +curId){
				tmp += `
        <li>
          <input id="editbox", placeholder="${todo.title}">
          <button id="submit_edit">submit</button>
					
            
        </li>
      `;}else{
				tmp += `
        <li>
        <svg id="${todo.id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIcon" aria-label="fontSize small"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>

          <span>${todo.title}</span>

					<button class="deletebtn" id="${todo.id}">X</button>

          <i id="${todo.id}" class="fa fa-edit"></i>

        </li>
      `;
			}
		})
			return tmp;
	}
	
	
	const createTmp = (arr) => {
		let tmp = "";
		arr.forEach((todo) => {
			
			tmp += `
        <li>
          <span>${todo.title}</span>
          <button class="deletebtn" id="${todo.id}">X</button>
          <div class="edit"> 
            <i class="fa fa-edit" id="${todo.id}"></i>
          </div>
          
          	<svg  class="finish1" id="${todo.id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path class="finish2" d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
					
            
        </li>
      `;
		});
		return tmp;
	};

  const createTmp_finish = (arr) => {
    let tmp = "";
		arr.forEach((todo) => {
			tmp += `
        <li>
        <svg id="${todo.id}" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIcon" aria-label="fontSize small"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>

          <span>${todo.title}</span>

					<button class="deletebtn" id="${todo.id}">X</button>

          <i id="${todo.id}" class="fa fa-edit"></i>

        </li>
      `;
		});
		return tmp;
  }

	return {
		render,
		createTmp,
		domstr,
		createTmp_finish,
		editTmp,
		editTmp2
	};
})();

export default View;