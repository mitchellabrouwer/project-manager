import { render } from "@testing-library/react";
import { Welcome } from "./Welcome";

describe("Home", () => {
  it("renders home", () => {
    // ARRANGE
    const { container } = render(<Welcome test="test" />);

    // ACT
    // await userEvent.click(screen.getByText("Load Greeting"));
    // await screen.findByRole("heading");

    // ASSERT
    expect(container.firstChild).toBeTruthy();
  });
});
