import React, { useEffect, useRef } from "react";
import styles from "../App.module.css";
import cs from "classnames";

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
		<form onSubmit={handleSearchSubmit} className={styles.searchForm}>
			<label htmlFor={id} className={styles.label}>
				{children}
			</label>{" "}
			&nbsp;
			<input
				className={styles.input}
				ref={inputRef}
				type={type}
				id={id}
				onChange={onInputChange}
				value={value}
				autoFocus={isFocused}
			/>
			<button
				className={cs(styles.button, styles.buttonLarge)}
				type="submit"
				disabled={!value}
			>
				Submit
			</button>
		</form>
	);
};

export default InputWithLabel;
