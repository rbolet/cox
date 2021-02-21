import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("DatasetId appears", async () => {
  render(<App />);
  expect(screen.queryByText("Dataset Id:")).not.toBeInTheDocument();

  fireEvent.click(screen.getByText("GO!"));
  expect(await screen.findByText("Dataset Id:")).toBeInTheDocument();
  expect(await screen.findByRole("note")).toBeInTheDocument();
});
