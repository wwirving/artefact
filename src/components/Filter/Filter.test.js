import React from "react";
import { render } from "@testing-library/react";
import Filter from "./Filter";

describe("Filter tests", () => {
  it("should render", () => {
    expect(render(<Filter />)).toBeTruthy();
  });
});
