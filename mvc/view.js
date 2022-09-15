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
				<div class="text-area">
					<span>${todo.title}</span>
				</div>
				<div class="button-area">
						<svg class="editbtn" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path id="delete" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>

						<svg class="deletebtn" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path id="edit" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>

						<svg class="finish" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path id="done"d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
				</div>


					
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
					<div class="text-area">
          	<span>${todo.title}</span>
					</div>
					<div class="button-area">
         		 <svg class="editbtn" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path id="delete" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>

							<svg class="deletebtn" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path id="edit" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>

							<svg class="finish" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path id="done"d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
					</div>     
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
					<div class="text-area">
          	<span>${todo.title}</span>
					</div>
					<div class="button-area">
						<button class="deletebtn">Delete</button>
						<button class="editbtn">Edit</button>
						<button class="finish">Done</button>
							
					</div>


            
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


/* <svg class="editbtn" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small">
							<path class="edit" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
							</svg>
							

							<svg class="deletebtn" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path class="delete" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>

							<svg class="finish" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path class="done" d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg> */