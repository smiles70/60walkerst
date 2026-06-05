import React from "react";
import { render, screen } from "@testing-library/react";
import UtilitiesSection from "../app/sections/utilities";

describe("UtilitiesSection", () => {
  it("renders without crashing", () => {
    render(<UtilitiesSection />);
  });

  it("renders the section title", () => {
    render(<UtilitiesSection />);
    expect(screen.getByRole("heading", { name: /Roommate Utilities Monthly Share/i })).toBeInTheDocument();
  });

  it("shows all utility rows in the table", () => {
    render(<UtilitiesSection />);
    expect(screen.getByText(/Propane/i)).toBeInTheDocument();
    expect(screen.getByText(/Water \/ Sewer/i)).toBeInTheDocument();
    expect(screen.getByText(/Electric/i)).toBeInTheDocument();
    expect(screen.getByText(/Internet/i)).toBeInTheDocument();
  });

  it("shows correct total cost and per-person share", () => {
    render(<UtilitiesSection />);
    expect(screen.getByText(/\$234\.50/)).toBeInTheDocument();
    expect(screen.getByText(/\$78\.17/)).toBeInTheDocument();
  });

  it("renders payment instructions", () => {
    render(<UtilitiesSection />);
    expect(screen.getByText(/Payment Instructions/i)).toBeInTheDocument();
    expect(screen.getByText(/By the 15th of each month/i)).toBeInTheDocument();
  });
});
