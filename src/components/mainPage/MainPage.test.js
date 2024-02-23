import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import DataContextProvider from "../../contexts/DataContext";
import MainPage from "./MainPage";

const history = createMemoryHistory();
history.push("/");

const wrapper = ({ children }) => (
  <Router navigator={history} location={history.location}>
    {children}
  </Router>
);

const mockAxios = new MockAdapter(axios);

const deepakData = {
  id: 11,
  name: "Deepak Negi",
  username: "Negi",
  email: "Deepak.10dec",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "123456788",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};
const yogitaData = {
  id: 12,
  name: "Yogita Bisht",
  username: "Bisht",
  email: "Yogita.10dec",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "123456788",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};
const userData = [deepakData, yogitaData];

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("test mainPage renders correctly", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test("renders component with data from context", async () => {
    const user = userEvent.setup();
    // Mock Axios response
    mockAxios
      .onGet("https://jsonplaceholder.typicode.com/users")
      .reply(200, userData);

    render(
      <DataContextProvider value={{ userData }}>
        <MainPage />
      </DataContextProvider>,
      { wrapper }
    );

    await waitFor(() => {
      expect(screen.getByText("Deepak Negi")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Yogita Bisht")).toBeInTheDocument();
    });

    const headingElement = screen.getByRole("heading", { name: "User Data" });
    expect(headingElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", {
      name: /12/,
    });
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    expect(mockUsedNavigate).toHaveBeenCalled();
    expect(mockUsedNavigate).toHaveBeenCalledWith("/users/12", {
      state: { rowData: yogitaData },
    });
  });
});
