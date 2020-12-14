import React, { useEffect, useRef } from "react";
import styled from "styled-components";
// import styles from "../App.module.css";
// import cs from "classnames";

const StyledButton = styled.button`
	background: transparent;
	border: 1px solid #171212;
	padding: 5px;
	cursor: pointer;

	transition: all 0.1s ease-in;

	&:hover {
		background: #171212;
		color: #ffffff;
	}
`;

const StyledButtonLarge = styled(StyledButton)`
	padding: 10px;
`;

const StyledSearchForm = styled.form`
	padding: 10px 0 20px 0;
	display: flex;
	align-items: baseline;
`;

const StyledLabel = styled.label`
	border-top: 1px solid #171212;
	border-left: 1px solid #171212;
	padding-left: 5px;
	font-size: 24px;
`;

const StyledInput = styled.input`
	border: none;
	border-bottom: 1px solid #171212;
	background-color: transparent;

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

			<StyledButtonLarge type="submit" disabled={!value}>
				Submit
			</StyledButtonLarge>
		</StyledSearchForm>
	);
};

export default InputWithLabel;
