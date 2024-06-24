import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i });
  const dueDate = "06/17/2024";
  fireEvent.change(inputTask, {target: {value: "Dishes"}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element)
  fireEvent.change(inputTask, {target: {value: "Dishes"}});
  fireEvent.change(inputDate, {target: { dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/Dishes/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const dueDate = "06/17/2024";
  const element = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const check = screen.queryByText(dueDate);
  expect(check).not.toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const element = screen.getByRole('button', { name: /Add/i });
  fireEvent.change(inputTask, { target: { value: "Dishes" } });
  fireEvent.click(element);
  const check = screen.queryByText(/Dishes/i);
  expect(check).not.toBeInTheDocument();
 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });
  const dueDate = "06/17/2024";
  fireEvent.change(inputTask, { target: { value: "Dishes" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const present = screen.getByText(/Dishes/i);
  expect(present).toBeInTheDocument();
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  const absent = screen.queryByText(/Dishes/i);
  expect(absent).not.toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', { name: /Add/i });
  let dueDate = "06/17/2024";
  fireEvent.change(inputTask, { target: { value: "Dishes" } });
  fireEvent.change(inputDate, { target: { value: dueDate } });
  fireEvent.click(element);
  const red = screen.getByTestId(/Dishes/i).style.background;
  expect(red).toBe("red");

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  fireEvent.change(inputTask, { target: { value: "Dishes" } });
  fireEvent.change(inputDate, { target: { value: "06/26/2024" } });
  fireEvent.click(element);
  const white = screen.getByTestId(/Dishes/i).style.background;
  expect(white).toBe("white");
 });
