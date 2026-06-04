import React from "react";
import { render, screen } from "@testing-library/react";
import WelcomeSection from "../app/sections/welcome";

describe("WelcomeSection", () => {
  it("renders without crashing", () => {
    render(<WelcomeSection />);
  });

  it("renders all 4 rule category cards", () => {
    render(<WelcomeSection />);
    expect(screen.getByText(/Communication Guidelines/i)).toBeInTheDocument();
    expect(screen.getByText(/Cleaning Rotation/i)).toBeInTheDocument();
    expect(screen.getByText(/Shared Supplies/i)).toBeInTheDocument();
    expect(screen.getByText(/Wi-Fi Info/i)).toBeInTheDocument();
  });

  it("renders the key reminder banner", () => {
    render(<WelcomeSection />);
    expect(screen.getByText(/Key Reminder/i)).toBeInTheDocument();
    expect(screen.getByText(/Make sure all dirty dishes/i)).toBeInTheDocument();
  });

  it("shows network name in Wi-Fi card", () => {
    render(<WelcomeSection />);
    expect(screen.getByText(/Network: WalkerSt60/i)).toBeInTheDocument();
  });
});
