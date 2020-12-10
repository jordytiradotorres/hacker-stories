import React, { useCallback, useEffect, useReducer, useState } from "react";
import axios from "axios";
import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import useSemiPersistentState from "./hooks/useSemiPersistentState";
import storiesReducer from "./reducers/index";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		isLoading: false,
		isError: false,
	});

	const [searchTerm, setSearchTerm] = useSemiPersistentState("search");

	const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

	const handleFetchStories = useCallback(async () => {
		if (!searchTerm === "") return;

		dispatchStories({
			type: "STORIES_FETCH_INIT",
		});

		try {
			const result = await axios.get(url);

			dispatchStories({
				type: "STORIES_FETCH_SUCCESS",
				payload: result.data.hits,
			});
		} catch {
			dispatchStories({
				type: "STORIES_FETCH_FAILURE",
			});
		}
	}, [url]);

	useEffect(() => {
		handleFetchStories();
	}, [handleFetchStories]);

	const handleRemoveStory = (item) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: item,
		});
	};

	const handleSearchInput = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = () => {
		setUrl(`${API_ENDPOINT}${searchTerm}`);
	};

	// crea una nueva matriz filtrada, apartir si coincide con el texto ingresado
	// const searchedStories = stories.data.filter((story) =>
	// 	story.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
	// );

	return (
		<div className="App">
			<h1>My Hacker Stories</h1>
			<InputWithLabel
				id="search"
				type="text"
				onInputChange={handleSearchInput}
				value={searchTerm}
				isFocused
			>
				<strong>Search:</strong>
			</InputWithLabel>

			<button
				type="button"
				disabled={!searchTerm}
				onClick={handleSearchSubmit}
			>
				Submit
			</button>
			<hr />

			{stories.isError && <h3>Algo salio mal...</h3>}

			{stories.isLoading ? (
				<h2>Cargando...</h2>
			) : (
				<List
					// list={searchedStories}
					list={stories.data}
					onRemoveItem={handleRemoveStory}
				/>
			)}
		</div>
	);
};

export default App;
