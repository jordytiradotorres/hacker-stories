import { useEffect, useState } from "react";

const useSemiPersistentState = (key) => {
	const [value, setValue] = useState(localStorage.getItem(key) || "");

	// cada vez que cambia el value, se renderiza useEffect
	useEffect(() => {
		localStorage.setItem(key, value);
	}, [value, key]);

	return [value, setValue];
};

export default useSemiPersistentState;
