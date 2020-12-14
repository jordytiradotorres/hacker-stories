import React, { useCallback, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import useSemiPersistentState from "./hooks/useSemiPersistentState";
import storiesReducer from "./reducers/index";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const StyledContainer = styled.div`
	height: 100vw;
	padding: 20px;
	background: #83a4d4;
	background: linear-gradient(to left, #b6fbff, #83a4d4);
	color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
	font-size: 48px;
	font-weight: 300;
	letter-spacing: 2px;
`;

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

	const handleSearchSubmit = (event) => {
		setUrl(`${API_ENDPOINT}${searchTerm}`);

		event.preventDefault();
	};

	// crea una nueva matriz filtrada, apartir si coincide con el texto ingresado
	// const searchedStories = stories.data.filter((story) =>
	// 	story.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
	// );

	return (
		<StyledContainer>
			<StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>

			<InputWithLabel
				id="search"
				type="text"
				isFocused
				value={searchTerm}
				onInputChange={handleSearchInput}
				handleSearchSubmit={handleSearchSubmit}
			>
				<strong>Search:</strong>
			</InputWithLabel>

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
		</StyledContainer>
	);
};

export default App;
