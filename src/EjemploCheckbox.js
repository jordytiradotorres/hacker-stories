import React, { useReducer } from "react";
import todoReducer from "./reducers/ejemploReductor";

const initialTodos = [
	{
		id: "a",
		task: "Learn React",
		complete: false,
	},
	{
		id: "b",
		task: "Learn Firebase",
		complete: false,
	},
];

const EjemploCheckbox = () => {
	const [todos, dispatch] = useReducer(todoReducer, initialTodos);

	const handleChange = (item) => {
		dispatch({
			type: item.complete ? "UNDO_TODO" : "DO_TODO",
			id: item.id,
		});
	};

	return (
		<ul>
			{todos.map((item) => (
				<li key={item.id}>
					<label>
						<input
							type="checkbox"
							checked={item.complete}
							onChange={() => handleChange(item)}
						/>
						{item.task}
					</label>
				</li>
			))}
		</ul>
	);
};

export default EjemploCheckbox;
