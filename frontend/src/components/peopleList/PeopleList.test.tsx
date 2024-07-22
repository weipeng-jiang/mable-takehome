import { render, screen, fireEvent } from "@testing-library/react";
import PeopleList from "./PeopleList";
import { People } from "./types";

const PEOPLE_MOCK: People = [
  { id: "1", name: "Alice", age: 30, location: "New York" },
  { id: "2", name: "Bob", age: 40, location: "Los Angeles" },
  { id: "3", name: "Charlie", age: 50, location: "Chicago" },
  { id: "4", name: "David", age: 60, location: "Houston" },
  { id: "5", name: "Eve", age: 70, location: "Phoenix" },
  { id: "6", name: "Frank", age: 0, location: "Sydney" },
  { id: "7", name: "Greg" },
];

test("renders PeopleList", () => {
  render(<PeopleList peopleData={PEOPLE_MOCK} />);

  screen.getByText("Alice");
  screen.getByText("Bob");
});

test("should render the list of people and allow drag and drop", () => {
  render(<PeopleList peopleData={PEOPLE_MOCK} />);

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(PEOPLE_MOCK.length);

  // Check initial order
  expect(items[0]).toHaveTextContent("Alice");
  expect(items[1]).toHaveTextContent("Bob");

  const element = screen.getByText("Alice");

  const SPACE = { keyCode: 32 };
  const ARROW_DOWN = { keyCode: 40 };

  fireEvent.keyDown(element, SPACE);
  fireEvent.keyDown(element, ARROW_DOWN);
  fireEvent.keyDown(element, SPACE);

  // Check the new order
  const reorderedItems = screen.getAllByRole("listitem");
  expect(reorderedItems[0]).toHaveTextContent("Bob");
  expect(reorderedItems[1]).toHaveTextContent("Alice");
});
