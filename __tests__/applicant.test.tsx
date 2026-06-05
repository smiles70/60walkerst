import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ApplicantSection from "../app/sections/applicant";

describe("ApplicantSection", () => {
  it("renders without crashing", () => {
    render(<ApplicantSection />);
  });

  it("renders the town title", () => {
    render(<ApplicantSection />);
    expect(screen.getByRole("heading", { name: /About Walden, NY/i })).toBeInTheDocument();
  });

  it("shows Town Info tab by default", () => {
    render(<ApplicantSection />);
    expect(screen.getByRole("tab", { name: /Town Info/i })).toHaveAttribute("aria-selected", "true");
  });

  it("renders town info cards", () => {
    render(<ApplicantSection />);
    expect(screen.getByText(/General Information/i)).toBeInTheDocument();
    expect(screen.getByText(/What's Nearby/i)).toBeInTheDocument();
    expect(screen.getByText(/Medical & Healthcare/i)).toBeInTheDocument();
    expect(screen.getByText(/Shopping & Dining/i)).toBeInTheDocument();
  });

  it("switches to Watchtower Facilities tab", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("tab", { name: /Watchtower Facilities/i }));
    expect(screen.getByRole("tab", { name: /Watchtower Facilities/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/World Headquarters/i)).toBeInTheDocument();
    expect(screen.getByText(/Watchtower Educational Center/i)).toBeInTheDocument();
    expect(screen.getByText(/Watchtower Farms/i)).toBeInTheDocument();
  });

  it("switches to Kingdom Halls tab", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("tab", { name: /Kingdom Halls/i }));
    expect(screen.getByRole("tab", { name: /Kingdom Halls/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/Kingdom Halls within 40 miles/i)).toBeInTheDocument();
  });

  it("shows Assembly Halls note when no halls within 40 miles", () => {
    render(<ApplicantSection />);
    fireEvent.click(screen.getByRole("tab", { name: /Kingdom Halls/i }));
    expect(screen.getByText(/No Assembly Halls/i)).toBeInTheDocument();
  });

  it("renders pricing section", () => {
    render(<ApplicantSection />);
    expect(screen.getByRole("heading", { name: /Pricing & What\'s Included/i })).toBeInTheDocument();
    expect(screen.getByText(/\$850 \/ month/i)).toBeInTheDocument();
    expect(screen.getByText(/High-Speed WiFi/i)).toBeInTheDocument();
  });

  it("renders testimonials section", () => {
    render(<ApplicantSection />);
    expect(screen.getByRole("heading", { name: /What Previous Roommates Say/i })).toBeInTheDocument();
    expect(screen.getByText(/Sarah M\./i)).toBeInTheDocument();
    expect(screen.getByText(/David K\./i)).toBeInTheDocument();
  });

  it("renders schedule tour section", () => {
    render(<ApplicantSection />);
    expect(screen.getByRole("heading", { name: /Schedule a Tour/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Contact to Schedule a Tour/i })).toBeInTheDocument();
    expect(screen.getByText(/Weekdays after 6 PM · Weekends by appointment/i)).toBeInTheDocument();
  });
});
