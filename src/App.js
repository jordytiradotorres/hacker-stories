import React, {
	useCallback,
	useEffect,
	useReducer,
	useState,
	useMemo,
} from "react";
import styled from "styled-components";
import axios from "axios";

import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import storiesReducer from "./reducers/index";
import useSemiPersistentState from "./hooks/useSemiPersistentState";
import Item from "./components/Item";
import LastSearches from "./components/LastSearches";

const StyledContainer = styled.div`
	padding: 20px;
	background-color: #a288a6;
	color: #1c1d21;
`;

const StyledHeadlinePrimary = styled.h1`
	font-size: 2.5em;
	letter-spacing: 2px;
	text-align: center;
	font-weight: 500;
`;

const StyledButton = styled.button`
	background: transparent;
	border: 1px solid #171212;
	padding: 5px;
	cursor: pointer;
	margin-right: 5px;
	width: 80px;
	outline: none;

	transition: all 0.1s ease-in;

	&:hover {
		background-color: #f1e3e4;
		color: #171212;
	}

	&:hover > svg > g {
		fill: #171212;
		stroke: #171212;
	}
`;

const StyledLoaderContainer = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
	min-height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: -4em 0 2em 0;

	& div {
		animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		transform-origin: 40px 40px;
	}
	& div:after {
		content: " ";
		display: block;
		position: absolute;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #fff;
		margin: -4px 0 0 -4px;
	}
	& div:nth-child(1) {
		animation-delay: -0.036s;
	}
	& div:nth-child(1):after {
		top: 63px;
		left: 63px;
	}
	& div:nth-child(2) {
		animation-delay: -0.072s;
	}
	& div:nth-child(2):after {
		top: 68px;
		left: 56px;
	}
	& div:nth-child(3) {
		animation-delay: -0.108s;
	}
	& div:nth-child(3):after {
		top: 71px;
		left: 48px;
	}
	& div:nth-child(4) {
		animation-delay: -0.144s;
	}
	& div:nth-child(4):after {
		top: 72px;
		left: 40px;
	}
	& div:nth-child(5) {
		animation-delay: -0.18s;
	}
	& div:nth-child(5):after {
		top: 71px;
		left: 32px;
	}
	& div:nth-child(6) {
		animation-delay: -0.216s;
	}
	& div:nth-child(6):after {
		top: 68px;
		left: 24px;
	}
	& div:nth-child(7) {
		animation-delay: -0.252s;
	}
	& div:nth-child(7):after {
		top: 63px;
		left: 17px;
	}
	& div:nth-child(8) {
		animation-delay: -0.288s;
	}
	& div:nth-child(8):after {
		top: 56px;
		left: 12px;
	}
	@keyframes lds-roller {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

const getUrl = (searchTerm, page) =>
	`${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const extractSearchTerm = (url) =>
	url
		.substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
		.replace(PARAM_SEARCH, "");
// const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const getSumComments = (stories) => {
	return stories.data.reduce(
		(result, value) => result + value.num_comments,
		0
	);
};

const App = () => {
	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		page: 0,
		isLoading: false,
		isError: false,
	});

	const [searchTerm, setSearchTerm] = useSemiPersistentState("search");

	const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);

	const handleFetchStories = useCallback(async () => {
		if (!searchTerm === "") return;

		dispatchStories({
			type: "STORIES_FETCH_INIT",
		});

		try {
			const lastUrl = urls[urls.length - 1];
			const result = await axios.get(lastUrl);

			dispatchStories({
				type: "STORIES_FETCH_SUCCESS",
				payload: {
					list: result.data.hits,
					page: result.data.page,
				},
			});
		} catch {
			dispatchStories({
				type: "STORIES_FETCH_FAILURE",
			});
		}
	}, [urls]);

	useEffect(() => {
		handleFetchStories();
	}, [handleFetchStories]);

	const handleRemoveStory = useCallback((item) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: item,
		});
	}, []);

	const handleSearchInput = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		handleSearch(searchTerm, 0);

		event.preventDefault();
	};

	// crea una nueva matriz filtrada, apartir si coincide con el texto ingresado
	// const searchedStories = stories.data.filter((story) =>
	// 	story.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
	// );

	const sumComments = useMemo(() => getSumComments(stories), [stories]);

	// los ultimos 5 busquedas

	const handleSearch = (searchTerm, page) => {
		const url = getUrl(searchTerm, page);
		setUrls(urls.concat(url));
	};

	const getLastSearches = (urls) =>
		urls
			.reduce((result, url, index) => {
				const searchTerm = extractSearchTerm(url);

				if (index === 0) {
					return result.concat(searchTerm);
				}

				const previousSearchTerm = result[result.length - 1];

				if (searchTerm === previousSearchTerm) {
					return result;
				} else {
					return result.concat(searchTerm);
				}
			}, [])
			.slice(-6)
			.slice(0, -1);

	const lastSearches = getLastSearches(urls);

	const handleLastSearch = (searchTerm) => {
		setSearchTerm(searchTerm);

		handleSearch(searchTerm, 0);
	};

	const handleMore = () => {
		const lastUrl = urls[urls.length - 1];
		const searchTerm = extractSearchTerm(lastUrl);
		handleSearch(searchTerm, stories.page + 1);
	};

	return (
		<StyledContainer>
			<StyledHeadlinePrimary>
				My Hacker Stories with: {sumComments} comments.
			</StyledHeadlinePrimary>

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

			<LastSearches
				lastSearches={lastSearches}
				onLastSearch={handleLastSearch}
			/>

			{stories.isError && <h3>Algo salio mal...</h3>}

			{stories.isLoading && (
				<>
					<StyledLoaderContainer class="lds-roller">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</StyledLoaderContainer>
				</>
			)}

			<List list={stories.data} onRemoveItem={handleRemoveStory} />

			{!stories.isLoading && stories.page >= 0 && (
				<StyledButton type="button" onClick={handleMore}>
					More
				</StyledButton>
			)}
		</StyledContainer>
	);
};

export default App;

// exportar componentes para hacer las pruebas con jest
export { InputWithLabel, List, Item };
