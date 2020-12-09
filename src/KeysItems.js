import React, { useState } from "react";

const initialList = [
	{ id: "a", name: "Learn React" },
	{ id: "b", name: "Learn GraphQL" },
];

const KeysItems = () => {
	const [list, setList] = useState(initialList);

	const [count, setCount] = useState(0);

	const handleClick = (event) => {
		event.preventDefault();
		setList(list.slice().reverse());
	};

	const increment = () => {
		setTimeout(() => setCount((state) => state + 1), 1000);
	};

	const decrement = () => {
		setTimeout(() => setCount((state) => state - 1), 1000);
	};

	return (
		<div>
			<ul>
				{list.map((item) => {
					return (
						<li key={item.id}>
							<label>
								<input type="checkbox" />
								{item.name}
							</label>
						</li>
					);
				})}
			</ul>

			<button type="button" onClick={handleClick}>
				Reverse List
			</button>

			<div>
				<p>Count: {count}</p>
				<button type="button" onClick={increment}>
					+1
				</button>
				<button type="button" onClick={decrement}>
					-1
				</button>
			</div>
		</div>
	);
};

export default KeysItems;
