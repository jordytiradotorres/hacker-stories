import React from "react";

const Item = ({ item, onRemoveItem }) => {
	return (
		<div>
			<span>
				<a href={item.url} target="blank">
					{item.title}
				</a>
			</span>{" "}
			<span>{item.author} </span>
			<span>{item.num_comments} </span>
			<span>{item.points}</span>{" "}
			<button onClick={() => onRemoveItem(item)}>Dismiss</button>
		</div>
	);
};

export default Item;
