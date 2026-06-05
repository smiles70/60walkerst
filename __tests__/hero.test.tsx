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

  it("renders the address title", () => {
    render(<HeroSection onSelectApplicant={mockApplicant} onSelectTenant={mockTenant} />);
    expect(screen.getByRole("heading", { name: /60 Walker St/i })).toBeInTheDocument();
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
