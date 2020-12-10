const todoReducer = (state, action) => {
	switch (action.type) {
		case "DO_TODO":
			return state.map((todo) => {
				if (todo.id === action.id) {
					return { ...todo, complete: true };
				} else {
					return todo;
				}
			});
		case "UNDO_TODO":
			return state.map((todo) => {
				if (todo.id === action.id) {
					return { ...todo, complete: false };
				} else {
					return todo;
				}
			});
		default:
			return state;
	}
};

export default todoReducer;
// const initialTodos = [
// 	{
// 		id: "a",
// 		task: "Learn React",
// 		complete: false,
// 	},
// 	{
// 		id: "b",
// 		task: "Learn Firebase",
// 		complete: false,
// 	},
// ];

// const action = {
// 	type: "DO_TODO",
// 	id: "a",
// };

// const newTodos = todoReducer(initialTodos, action);
// console.log(newTodos);
