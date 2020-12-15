import { useEffect, useState, useRef } from "react";

// la funcion va a devolver un string y una actualizacion de funcion con un parametro pero no retorna nada
const useSemiPersistentState = (key) => {
	const isMounted = useRef(false);

	const [value, setValue] = useState(localStorage.getItem(key) || "");

	// cada vez que cambia el value, se renderiza useEffect
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
		} else {
			console.log("A");
			localStorage.setItem(key, value);
		}
	}, [value, key]);

	return [value, setValue];
};

export default useSemiPersistentState;
