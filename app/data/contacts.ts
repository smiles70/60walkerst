export interface ContactProvider {
  id: string;
  name: string;
  service: string;
  phone: string;
  icon: string;
  description: string;
}

export interface ActionItem {
  id: string;
  label: string;
  icon: string;
  variant: "primary" | "secondary" | "danger";
}

export const contactsTitle = "Contact Information & Actions";
export const contactsSubtitle = "Quick access to providers and household actions";

export const providers: ContactProvider[] = [
  {
    id: "nyseg",
    name: "NYSEG",
    service: "Electric",
    phone: "1-800-572-1111",
    icon: "Zap",
    description: "Report outages, billing questions, service issues",
  },
  {
    id: "village-walden",
    name: "Village of Walden",
    service: "Water & Sewer",
    phone: "845-778-2121",
    icon: "Droplets",
    description: "Water service, sewer issues, municipal questions",
  },
  {
    id: "blue-flame",
    name: "Blue Flame",
    service: "Propane",
    phone: "845-778-2121",
    icon: "Flame",
    description: "Propane delivery, tank service, billing",
  },
];

export const actionItems: ActionItem[] = [
  {
    id: "report-outage",
    label: "Report Outage",
    icon: "AlertTriangle",
    variant: "danger",
  },
  {
    id: "confirm-bills",
    label: "Confirm Bills",
    icon: "ClipboardCheck",
    variant: "primary",
  },
  {
    id: "pay-bills",
    label: "Pay Bills",
    icon: "CreditCard",
    variant: "secondary",
  },
];
