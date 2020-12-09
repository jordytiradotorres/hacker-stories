import React, { useEffect, useRef } from "react";

const InputWithLabel = ({
	id,
	type,
	onInputChange,
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
		<form>
			<label htmlFor={id}>{children}</label> &nbsp;
			<input
				ref={inputRef}
				type={type}
				id={id}
				onChange={onInputChange}
				value={value}
				autoFocus={isFocused}
			/>
		</form>
	);
};

export default InputWithLabel;
