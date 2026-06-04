import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home Page", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("renders the site title", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /60 Walker St/i })).toBeInTheDocument();
  });

  it("renders all three sections", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Roommate Welcome Summary/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Roommate Utilities Monthly Share/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Contact Information & Actions/i })).toBeInTheDocument();
  });
});
