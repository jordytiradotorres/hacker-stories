import React, { useEffect, useRef } from "react";
import styled from "styled-components";
// import styles from "../App.module.css";
// import cs from "classnames";

const StyledButton = styled.button`
	background: transparent;
	border: 1px solid #171212;
	padding: 5px;
	cursor: pointer;
	margin-left: 0.5em;
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

const StyledSearchForm = styled.form`
	padding: 10px 0 20px 0;
`;

const StyledLabel = styled.label`
	font-size: 24px;
	margin-right: 0.5em;
`;

const StyledInput = styled.input`
	border: none;
	border-bottom: 1px solid #171212;
	background-color: transparent;
	outline: none;
	font-size: 24px;
`;

const InputWithLabel = ({
	id,
	type,
	onInputChange,
	handleSearchSubmit,
	value,
	children,
	isFocused,
}) => {
	const inputRef = useRef();

	useEffect(() => {
		// forma imperativa
		if (isFocused && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isFocused]);

	return (
		<StyledSearchForm onSubmit={handleSearchSubmit}>
			<StyledLabel htmlFor={id}>{children}</StyledLabel>

			<StyledInput
				ref={inputRef}
				type={type}
				id={id}
				onChange={onInputChange}
				value={value}
				autoFocus={isFocused}
			/>

			<StyledButton type="submit" disabled={!value}>
				Submit
			</StyledButton>
		</StyledSearchForm>
	);
};

export default InputWithLabel;
