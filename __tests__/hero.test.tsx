import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroSection from "../app/sections/hero";

describe("HeroSection", () => {
  const mockApplicant = jest.fn();
  const mockTenant = jest.fn();

  beforeEach(() => {
    mockApplicant.mockClear();
    mockTenant.mockClear();
  });

  it("renders without crashing", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
  });

  it("renders the value-driven headline", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    expect(screen.getByRole("heading", { name: /Your Next Chapter Starts Here/i })).toBeInTheDocument();
  });

  it("renders the address subtitle", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    expect(screen.getByText(/60 Walker St — Walden, NY/i)).toBeInTheDocument();
  });

  it("renders trust badges", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    expect(screen.getByText(/Available Now/i)).toBeInTheDocument();
    expect(screen.getByText(/No Broker Fee/i)).toBeInTheDocument();
    expect(screen.getByText(/Move-In Ready/i)).toBeInTheDocument();
  });

  it("renders social proof line", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    expect(screen.getByText(/Loved by previous roommates/i)).toBeInTheDocument();
    expect(screen.getByText(/5-star household/i)).toBeInTheDocument();
  });

  it("renders What's Included teaser", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    expect(screen.getByText(/What's Included/i)).toBeInTheDocument();
    expect(screen.getByText(/Private Bedroom/i)).toBeInTheDocument();
    expect(screen.getByText(/Shared Kitchen/i)).toBeInTheDocument();
    expect(screen.getByText(/High-Speed WiFi/i)).toBeInTheDocument();
    expect(screen.getByText(/Utilities Included/i)).toBeInTheDocument();
  });

  it("renders both CTA buttons", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    expect(screen.getByRole("button", { name: /Applicant/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tenant/i })).toBeInTheDocument();
  });

  it("calls onSelectApplicant when Applicant button is clicked", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    fireEvent.click(screen.getByRole("button", { name: /Applicant/i }));
    expect(mockApplicant).toHaveBeenCalledTimes(1);
  });

  it("calls onSelectTenant when Tenant button is clicked", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    fireEvent.click(screen.getByRole("button", { name: /Tenant/i }));
    expect(mockTenant).toHaveBeenCalledTimes(1);
  });
});
