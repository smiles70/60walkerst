import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../app/page";

describe("Home Page", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("renders the hero with both buttons by default", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Your Next Chapter Starts Here/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Applicant/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tenant/i })).toBeInTheDocument();
  });

  it("does not show tenant sections by default", () => {
    render(<Home />);
    expect(screen.queryByRole("heading", { name: /Roommate Welcome Summary/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Roommate Utilities Monthly Share/i })).not.toBeInTheDocument();
  });

  it("shows applicant section when Applicant button is clicked", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Applicant/i }));
    expect(screen.getByRole("heading", { name: /About 60 Walker St/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("shows tenant portal cards after PIN + email auth", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Tenant/i }));

    // Should show tenant login form
    expect(screen.getByRole("heading", { name: /Tenant Access/i })).toBeInTheDocument();

    // Enter tenant PIN
    const pinInput = screen.getByPlaceholderText("_ _ _ _ _ _");
    fireEvent.change(pinInput, { target: { value: "707201" } });
    fireEvent.click(screen.getByRole("button", { name: /Enter/i }));

    // Should show email step
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();

    // Enter whitelisted email
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: "stmiles1@yahoo.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Verify/i }));

    // Now tenant portal cards should be visible
    expect(screen.getByRole("heading", { name: /60 Walker St — Tenant Portal/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Welcome Home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Monthly Share/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View Contact & Actions/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });

  it("returns to hero when Back button is clicked from applicant view", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Applicant/i }));
    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(screen.getByRole("button", { name: /Applicant/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /About 60 Walker St/i })).not.toBeInTheDocument();
  });

  it("returns to hero when Back button is clicked from tenant view", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Tenant/i }));
    fireEvent.click(screen.getByRole("button", { name: /Back/i }));
    expect(screen.getByRole("button", { name: /Tenant/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Roommate Welcome Summary/i })).not.toBeInTheDocument();
  });
});
