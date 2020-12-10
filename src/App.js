import React, { useEffect, useReducer } from "react";
import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import useSemiPersistentState from "./hooks/useSemiPersistentState";
import storiesReducer from "./reducers/index";

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

	// const [stories, setStories] = useState([]);
	// const [stories, dispatchStories] = useReducer(storiesReducer, []);
	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		isLoading: false,
		isError: false,
	});

	const [searchTerm, setSearchTerm] = useSemiPersistentState("search");
	// const [isLoading, setIsLoading] = useState(false);
	// const [isError, setIsError] = useState(false);

	const getAsyncStories = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ data: { stories: initialStories } });
			}, 2000);
		});
	};

	useEffect(() => {
		// setIsLoading(true);
		dispatchStories({
			type: "STORIES_FETCH_INIT",
		});

		getAsyncStories()
			.then((result) => {
				// setStories(result.data.stories);
				dispatchStories({
					type: "STORIES_FETCH_SUCCESS",
					payload: result.data.stories,
				});
				// setIsLoading(false);
			})
			.catch(() => {
				// setIsError(true);
				// setIsLoading(false);
				dispatchStories({
					type: "STORIES_FETCH_FAILURE",
				});
			});
	}, []);

	const handleRemoveStories = (item) => {
		// const newStories = stories.filter(
		// 	(story) => item.objectID !== story.objectID
		// );

		// setStories(newStories);
		dispatchStories({
			type: "REMOVE_STORY",
			payload: item,
		});
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	// crea una nueva matriz filtrada, apartir si coincide con el texto ingresado
	const searchedStories = stories.data.filter((story) =>
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

			{stories.isError && <h3>Algo salio mal...</h3>}

			{stories.isLoading ? (
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
