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
    percentOfTotal: 36.4,
    perPerson: 34.0,
    icon: "Flame",
    color: "amber",
  },
  {
    utility: "Electric",
    provider: "NYSEG",
    totalCost: 48.0,
    percentOfTotal: 25.7,
    perPerson: 24.0,
    icon: "Zap",
    color: "yellow",
  },
  {
    utility: "Internet",
    provider: "Spectrum",
    totalCost: 71.0,
    percentOfTotal: 37.9,
    perPerson: 35.5,
    icon: "Wifi",
    color: "blue",
  },
];

export const utilityTotals = {
  totalCost: 187.0,
  percentOfTotal: 100,
  perPerson: 93.5,
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
