import React from "react";
import styled from "styled-components";

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
	margin-bottom: 1.2em;
	display: inline-block;
	margin-right: 0.5em;
	color: #ffffff;
	text-transform: uppercase;
`;

const LastSearches = ({ lastSearches, onLastSearch }) => {
	return (
		<>
			<StyledSpan>
				Últimas busquedas:{" "}
				{lastSearches.length === 0 && "Aun no hay busquedas"}
			</StyledSpan>
			{lastSearches.map((searchTerm, index) => (
				<StyledButton
					key={searchTerm + index}
					type="button"
					onClick={() => onLastSearch(searchTerm)}
				>
					{searchTerm}
				</StyledButton>
			))}
		</>
	);
};

export default LastSearches;
