import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ApplicantSection from "../app/sections/applicant";

describe("ApplicantSection", () => {
  it("renders without crashing", () => {
    render(<ApplicantSection />);
  });

  it("renders the town title", () => {
    render(<ApplicantSection />);
    expect(screen.getByRole("heading", { name: /About 60 Walker St/i })).toBeInTheDocument();
  });

  it("shows two category cards by default", () => {
    render(<ApplicantSection />);
    expect(screen.getByRole("button", { name: /View details about this home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View details about the area/i })).toBeInTheDocument();
    expect(screen.getByText(/About This Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About The Area/i)).toBeInTheDocument();
  });

  it("clicking About This Home shows pricing, testimonials, and schedule tour", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("button", { name: /View details about this home/i }));
    expect(screen.getByRole("heading", { name: /Pricing & What\'s Included/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /What Previous Roommates Say/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Schedule a Tour/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact to schedule a tour/i })).toBeInTheDocument();
  });

  it("clicking About This Home shows back button", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("button", { name: /View details about this home/i }));
    expect(screen.getByRole("button", { name: /Back to categories/i })).toBeInTheDocument();
  });

  it("clicking back from home returns to cards", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("button", { name: /View details about this home/i }));
    expect(screen.getByRole("button", { name: /Back to categories/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Back to categories/i }));
    expect(screen.getByRole("button", { name: /View details about this home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View details about the area/i })).toBeInTheDocument();
  });

  it("clicking About The Area shows tabs", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("button", { name: /View details about the area/i }));
    expect(screen.getByRole("tab", { name: /Town Info/i })).toHaveAttribute("aria-selected", "true");
  });

  it("renders town info cards in area view", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("button", { name: /View details about the area/i }));
    expect(screen.getByText(/General Information/i)).toBeInTheDocument();
    expect(screen.getByText(/What's Nearby/i)).toBeInTheDocument();
    expect(screen.getByText(/Medical & Healthcare/i)).toBeInTheDocument();
    expect(screen.getByText(/Shopping & Dining/i)).toBeInTheDocument();
  });

  it("switches to Watchtower Facilities tab in area view", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("button", { name: /View details about the area/i }));
    fireEvent.click(screen.getByRole("tab", { name: /Watchtower Facilities/i }));
    expect(screen.getByRole("tab", { name: /Watchtower Facilities/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/World Headquarters/i)).toBeInTheDocument();
    expect(screen.getByText(/Watchtower Educational Center/i)).toBeInTheDocument();
    expect(screen.getByText(/Watchtower Farms/i)).toBeInTheDocument();
  });

  it("switches to Kingdom Halls tab in area view", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("button", { name: /View details about the area/i }));
    fireEvent.click(screen.getByRole("tab", { name: /Kingdom Halls/i }));
    expect(screen.getByRole("tab", { name: /Kingdom Halls/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/Kingdom Halls within 70 miles/i)).toBeInTheDocument();
  });

  it("shows Assembly Halls note when no halls within 70 miles", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("button", { name: /View details about the area/i }));
    fireEvent.click(screen.getByRole("tab", { name: /Kingdom Halls/i }));
    expect(screen.getByText(/No Assembly Halls/i)).toBeInTheDocument();
  });

});
