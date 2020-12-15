import React from "react";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App, { Item, List, InputWithLabel } from "./App";
import axios from "axios";

jest.mock("axios");

describe("Item", () => {
	const item = {
		title: "React",
		url: "https://reactjs.org/",
		author: "Jordan Walke",
		num_comments: 3,
		points: 4,
		objectID: 0,
	};

	const handleRemoveItem = jest.fn();

	let component;

	beforeEach(() => {
		component = renderer.create(
			<Item item={item} onRemoveItem={handleRemoveItem} />
		);
	});

	// it("renders all properties", () => {
	// 	component = renderer.create(<Item item={item} />);

	// 	expect(component.root.findByType("a").props.href).toEqual(
	// 		"https://reactjs.org/"
	// 	);

	// 	expect(
	// 		component.root.findAllByProps({ children: "Jordan Walke" }).length
	// 	).toEqual(1);
	// });

	it("calls onRemoveItem on button click", () => {
		const component = renderer.create(
			<Item item={item} onRemoveItem={handleRemoveItem} />
		);

		component.root.findByType("button").props.onClick();

		expect(handleRemoveItem).toHaveBeenCalledTimes(1);
		expect(handleRemoveItem).toHaveBeenCalledWith(item);

		expect(component.root.findAllByType(Item).length).toEqual(1);
	});
});

describe("List", () => {
	const list = [
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

	it("renders two items", () => {
		const component = renderer.create(<List list={list} />);

		expect(component.root.findAllByType(Item).length).toEqual(2);
	});
});

describe("App", () => {
	it("succeeds fetching data with a list", async () => {
		const list = [
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

		const promise = Promise.resolve({
			data: {
				hits: list,
			},
		});

		axios.get.mockImplementationOnce(() => promise);

		let component;

		await renderer.act(async () => {
			component = renderer.create(<App />);
		});

		expect(component.root.findByType(List).props.list).toEqual(list);
	});

	it("fails fetching data with a list", async () => {
		const promise = Promise.reject();

		axios.get.mockImplementationOnce(() => promise);

		let component;

		await renderer.act(async () => {
			component = renderer.create(<App />);
		});

		expect(component.root.findByType("p").props.children).toEqual(
			"Something went wrong ..."
		);
	});
});
