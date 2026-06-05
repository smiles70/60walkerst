/**
 * Management Portal Configuration
 * PIN for management dashboard access
 * Change this value to rotate the PIN
 */
export const MANAGEMENT_PIN = "606060";

export interface ManagementWidget {
  id: string;
  title: string;
  value: string;
  icon: string;
  color: string;
}

export const dashboardWidgets: ManagementWidget[] = [
  {
    id: "rent",
    title: "Rent Status",
    value: "Current",
    icon: "DollarSign",
    color: "bg-green",
  },
  {
    id: "maintenance",
    title: "Maintenance Requests",
    value: "0 Pending",
    icon: "Wrench",
    color: "bg-navy",
  },
  {
    id: "utilities",
    title: "Utilities Due",
    value: "$0",
    icon: "Zap",
    color: "bg-amber",
  },
  {
    id: "documents",
    title: "Documents",
    value: "3 Files",
    icon: "FileText",
    color: "bg-navy",
  },
];

export const managementDocuments = [
  { id: "lease", label: "Lease Agreement", icon: "FileText" },
  { id: "utility-bill", label: "Latest Utility Bill", icon: "Zap" },
  { id: "insurance", label: "Insurance Policy", icon: "Shield" },
];
