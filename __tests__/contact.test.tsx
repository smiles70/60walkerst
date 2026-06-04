import React from "react";
import { render, screen } from "@testing-library/react";
import ContactSection from "../app/sections/contact";

describe("ContactSection", () => {
  it("renders without crashing", () => {
    render(<ContactSection />);
  });

  it("renders the section title", () => {
    render(<ContactSection />);
    expect(screen.getByRole("heading", { name: /Contact Information & Actions/i })).toBeInTheDocument();
  });

  it("renders all 3 provider cards", () => {
    render(<ContactSection />);
    expect(screen.getByText(/NYSEG/i)).toBeInTheDocument();
    expect(screen.getByText(/Village of Walden/i)).toBeInTheDocument();
    expect(screen.getByText(/Blue Flame/i)).toBeInTheDocument();
  });

  it("shows provider phone numbers", () => {
    render(<ContactSection />);
    expect(screen.getByText(/1-800-572-1111/i)).toBeInTheDocument();
    expect(screen.getAllByText(/845-778-2121/i)).toHaveLength(2);
  });

  it("renders quick action buttons", () => {
    render(<ContactSection />);
    expect(screen.getByRole("button", { name: /Report Outage/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Confirm Bills/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pay Bills/i })).toBeInTheDocument();
  });
});
