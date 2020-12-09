import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import useSemiPersistentState from "./hooks/useSemiPersistentState";

const App = () => {
	const initialStories = [
		{
			title: "React",
			url: "https://reactjs.org/",
			author: "Jordan Walke",
			num_comments: 3,
			points: 4,
			objectID: 0,
		},
		{
			title: "Redux",
			url: "https://redux.js.org/",
			author: "Dan Abramov, Andrew Clark",
			num_comments: 2,
			points: 5,
			objectID: 1,
		},
	];

	const [stories, setStories] = useState([]);
	const [searchTerm, setSearchTerm] = useSemiPersistentState("search");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const getAsyncStories = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ data: { stories: initialStories } });
			}, 2000);
		});
	};

	useEffect(() => {
		setIsLoading(true);

		getAsyncStories()
			.then((result) => {
				setStories(result.data.stories);
				setIsLoading(false);
			})
			.catch(() => {
				setIsError(true);
				setIsLoading(false);
			});
	}, []);

	const handleRemoveStories = (item) => {
		const newStories = stories.filter(
			(story) => item.objectID !== story.objectID
		);

		setStories(newStories);
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	// crea una nueva matriz filtrada, apartir si coincide con el texto ingresado
	const searchedStories = stories.filter((story) =>
		story.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
	);

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

			{isError && <h3>Algo salio mal...</h3>}

			{isLoading ? (
				<h2>Cargando...</h2>
			) : (
				<List
					list={searchedStories}
					onRemoveItem={handleRemoveStories}
				/>
			)}
		</div>
	);
};

export default App;
