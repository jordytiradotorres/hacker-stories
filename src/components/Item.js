import React from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../close.svg";

const StyledItem = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 5px;
`;

const StyledColumn = styled.span`
	padding: 0 5px;
	white-space: nowrap;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	a {
		color: inherit;
	}

	width: ${(props) => props.width};
`;

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
		fill: #f1e3e4;
		stroke: #f1e3e4;
	}
`;

const StyledButtonSmall = styled(StyledButton)`
	padding: 5px;
`;

const Item = ({ item, onRemoveItem }) => {
	return (
		<StyledItem>
			<StyledColumn width="40%">
				<a href={item.url} target="blank">
					{item.title}
				</a>
			</StyledColumn>
			<StyledColumn width="30%">{item.author}</StyledColumn>
			<StyledColumn width="10%">{item.num_comments}</StyledColumn>
			<StyledColumn width="10%">{item.points}</StyledColumn>
			<StyledColumn width="10%">
				<StyledButtonSmall
					type="button"
					onClick={() => onRemoveItem(item)}
				>
					{/* Dismiss */}
					<Close height="18px" width="18px" />
				</StyledButtonSmall>
			</StyledColumn>
		</StyledItem>
	);
};

export default Item;
