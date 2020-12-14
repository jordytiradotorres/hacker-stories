import React from "react";
import Item from "./Item";

const List = React.memo(({ list, onRemoveItem }) => {
	return list.map((item) => {
		// const { objectID, ...resto } = item;

		return (
			<Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
		);
	});
});

export default List;
