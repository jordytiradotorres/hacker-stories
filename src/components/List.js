import React, { useState } from "react";
import { sortBy } from "lodash";
import styled from "styled-components";

import Item from "./Item";

const StyledButton = styled.button`
	background: transparent;
	border: 1px solid #171212;
	padding: 5px;
	cursor: pointer;
	margin-right: 5px;
	width: 80px;
	outline: none;

	transition: all 0.1s ease-in;

	&:hover {
		background-color: #f1e3e4;
		color: #171212;
	}

	&:hover > svg > g {
		fill: #171212;
		stroke: #171212;
	}
`;

const StyledSpan = styled.span`
	margin-bottom: 1em;
	display: inline-block;
	margin-right: 0.5em;
	color: #ffffff;
	text-transform: uppercase;
`;

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
				<StyledSpan>Ordenar por: </StyledSpan>
				<span>
					<StyledButton
						type="button"
						onClick={() => handleSort("TITLE")}
					>
						Title
					</StyledButton>
				</span>

				<span>
					<StyledButton
						type="button"
						onClick={() => handleSort("AUTHOR")}
					>
						Author
					</StyledButton>
				</span>

				<span>
					<StyledButton
						type="button"
						onClick={() => handleSort("COMMENT")}
					>
						Comments
					</StyledButton>
				</span>

				<span>
					<StyledButton
						type="button"
						onClick={() => handleSort("POINT")}
					>
						Points
					</StyledButton>
				</span>
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
