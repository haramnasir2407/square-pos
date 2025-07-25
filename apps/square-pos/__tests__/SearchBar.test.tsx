import SearchBar from "@/components/composites/dashboard/search/SearchBar";
import { act, fireEvent, render, screen } from "@testing-library/react";

const dummySetParams = jest.fn();
const dummyPrevParams = { types: "item", query: {} };

describe("SearchBar", () => {
  it("renders input", () => {
    render(
      <SearchBar setParams={dummySetParams} prevParams={dummyPrevParams} />
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls setParams when typing 3+ chars", async () => {
    const setParams = jest.fn();
    render(
      <SearchBar
        setParams={setParams}
        prevParams={{ types: "item", query: {} }}
      />
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });
    await act(() => new Promise((res) => setTimeout(res, 500))); // wait for debounce
    expect(setParams).toHaveBeenCalled();
  });
});
