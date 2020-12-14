import React, { useReducer } from "react";
import todoReducer from "./reducers/ejemploReductor";
import styled from "styled-components";

const StyledButton = styled.button`
	cursor: pointer;
	background: transparent;
	font-size: 16px;
	border-radius: 3px;
	color: ${(props) => (props.primary ? "green" : "palevioletred")};
	border: ${(props) => (props.primary ? "violet" : "palevioletred")};

	margin: 0 1em;
	padding: 0.25em 1em;
	transition: 0.5s all ease-out;

	&:hover {
		color: white;
		background-color: ${(props) =>
			props.primary ? "violet" : "palevioletred"};
	}
`;

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
		<>
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

			<StyledButton>un boton</StyledButton>
			<StyledButton primary>un boton primario</StyledButton>
		</>
	);
};

export default EjemploCheckbox;
