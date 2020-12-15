import React, { useState } from "react";
import { sortBy } from "lodash";

import Item from "./Item";

const List = React.memo(({ list, onRemoveItem }) => {
	const SORTS = {
		NONE: (list) => list,
		TITLE: (list) => sortBy(list, "title"),
		AUTHOR: (list) => sortBy(list, "author"),
		COMMENT: (list) => sortBy(list, "num_comments").reverse(),
		POINT: (list) => sortBy(list, "points").reverse(),
	};

	// con vanillaJS
	// const sortStories = list.sort((a, b) => (a.title < b.title ? -1 : 1));

	// con lodash
	const [sort, setSort] = useState({
		sortKey: "NONE",
		isReverse: false,
	});

	const handleSort = (sortKey) => {
		const isReverse = sort.sortKey === sortKey && !sort.isReverse;

		setSort({
			sortKey,
			isReverse,
		});
	};

	const sortFunction = SORTS[sort.sortKey];

	const sortedList = sort.isReverse
		? sortFunction(list).reverse()
		: sortFunction(list);

	return (
		<div>
			<div>
				<span>
					<button type="button" onClick={() => handleSort("TITLE")}>
						Title
					</button>
				</span>

				<span>
					<button type="button" onClick={() => handleSort("AUTHOR")}>
						Author
					</button>
				</span>

				<span>
					<button type="button" onClick={() => handleSort("COMMENT")}>
						Comments
					</button>
				</span>

				<span>
					<button type="button" onClick={() => handleSort("POINT")}>
						Points
					</button>
				</span>

				<span>Actions</span>
			</div>
			{sortedList.map((item) => (
				<Item
					key={item.objectID}
					item={item}
					onRemoveItem={onRemoveItem}
				/>
			))}
		</div>
	);
});

export default List;
