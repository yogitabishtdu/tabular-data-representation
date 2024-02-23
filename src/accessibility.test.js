import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import DataContextProvider from "../src/contexts/DataContext";
import MainPage from "../src/components/mainPage";

expect.extend(toHaveNoViolations);

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

afterEach(() => {
  mockAxios.reset();
});

test("accessibility", async () => {
  mockAxios
    .onGet("https://jsonplaceholder.typicode.com/users")
    .reply(200, userData);

  const { container } = render(
    <DataContextProvider value={{ userData }}>
      <MainPage />
    </DataContextProvider>
  );

  expect(await axe(container)).toHaveNoViolations();
});
