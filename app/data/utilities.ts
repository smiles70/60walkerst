export interface UtilityRow {
  utility: string;
  provider: string;
  totalCost: number;
  percentOfTotal: number;
  perPerson: number;
  icon: string;
  color: string;
}

export const utilitiesTitle = "Roommate Utilities Monthly Share";
export const utilitiesSubtitle = "Sharing costs. Living better. Thank you for being considerate.";

export const utilityRows: UtilityRow[] = [
  {
    utility: "Propane",
    provider: "Blue Flame",
    totalCost: 68.0,
    percentOfTotal: 29.0,
    perPerson: 22.67,
    icon: "Flame",
    color: "amber",
  },
  {
    utility: "Water / Sewer",
    provider: "Village of Walden",
    totalCost: 47.5,
    percentOfTotal: 20.2,
    perPerson: 15.83,
    icon: "Droplets",
    color: "blue",
  },
  {
    utility: "Electric",
    provider: "NYSEG",
    totalCost: 48.0,
    percentOfTotal: 20.4,
    perPerson: 16.0,
    icon: "Zap",
    color: "yellow",
  },
  {
    utility: "Internet",
    provider: "Spectrum",
    totalCost: 71.0,
    percentOfTotal: 30.3,
    perPerson: 23.67,
    icon: "Wifi",
    color: "purple",
  },
];

export const utilityTotals = {
  totalCost: 234.5,
  percentOfTotal: 100,
  perPerson: 78.17,
};

export const paymentInstructions = {
  payByDate: "By the 15th of each month",
  methods: ["Venmo", "Zelle"],
  note: "Send to service provider directly",
  asterisk: "*based on 12 months average and 3 roommates sharing, subject to change",
};

export const reminderNote = {
  icon: "FileText" as const,
  text: "A full roommate agreement will be provided upon approval",
};
