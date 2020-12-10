import React, { useCallback, useEffect, useReducer } from "react";
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

	const handleFetchStories = useCallback(() => {
		if (!searchTerm === "") return;

		dispatchStories({
			type: "STORIES_FETCH_INIT",
		});

		fetch(`${API_ENDPOINT}${searchTerm}`)
			.then((response) => response.json())
			.then((result) => {
				dispatchStories({
					type: "STORIES_FETCH_SUCCESS",
					payload: result.hits,
				});
			})
			.catch(() => {
				dispatchStories({
					type: "STORIES_FETCH_FAILURE",
				});
			});
	}, [searchTerm]);

	useEffect(() => {
		handleFetchStories();
	}, [handleFetchStories]);

	const handleRemoveStory = (item) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: item,
		});
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
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
				onInputChange={handleSearch}
				value={searchTerm}
				isFocused
			>
				<strong>Search:</strong>
			</InputWithLabel>

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
