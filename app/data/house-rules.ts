export interface RuleCategory {
  id: string;
  icon: string;
  title: string;
  items: string[];
  highlight?: boolean;
}

export const welcomeTitle = "Roommate Welcome Summary";
export const welcomeSubtitle = "Welcome Home — Shared Respect & Clear Communication";

export const houseRules: RuleCategory[] = [
  {
    id: "communication",
    icon: "MessageCircle",
    title: "Communication Guidelines",
    items: [
      "Talk Early & Often",
      "Be Respectful",
      "Address Issues Directly",
    ],
  },
  {
    id: "cleaning",
    icon: "Sparkles",
    title: "Cleaning Rotation",
    items: [
      "Roommates A & B",
      "Swap Weekly",
    ],
  },
  {
    id: "supplies",
    icon: "Package",
    title: "Shared Supplies",
    items: [
      "Trash Bags",
      "Paper Towels",
      "Dish Soap",
    ],
  },
  {
    id: "wifi",
    icon: "Wifi",
    title: "Wi-Fi Info",
    items: [
      "Network: WalkerSt60",
      "Password: Ask a roommate for the current Wi-Fi password",
    ],
    highlight: true,
  },
];

export const keyReminder = {
  icon: "AlertTriangle",
  text: "Make sure all dirty dishes in rooms are placed in the dishwasher.",
};
