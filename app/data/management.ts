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
];

export const managementDocuments = [
  { id: "lease", label: "Lease Agreement", icon: "FileText" },
  { id: "utility-bill", label: "Latest Utility Bill", icon: "Zap" },
  { id: "insurance", label: "Insurance Policy", icon: "Shield" },
];
