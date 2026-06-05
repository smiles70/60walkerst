export interface Attachment {
  id: string;
  label: string;
  filename: string;
  url: string;
}

export interface Applicant {
  id: string;
  name: string;
  initials: string;
  address: string;
  moveInDate: string;
  submittedDate: string;
  status: "complete" | "pending" | "screening" | "verified" | "accepted" | "rejected";
  journeyStage: number; // 0-4: Lead, Application, Screening, Verification, Decision
  email: string;
  phone: string;
  attachments: Attachment[];
  notes: string;
}

export const applicants: Applicant[] = [
  {
    id: "alaina-carnell",
    name: "Alaina Carnell",
    initials: "AC",
    address: "60 Walker St",
    moveInDate: "06/01/2026",
    submittedDate: "06/03/2026",
    status: "complete",
    journeyStage: 2, // At Screening
    email: "alaina.carnell@email.com",
    phone: "(555) 123-4567",
    attachments: [
      {
        id: "earnings",
        label: "Earnings Statement",
        filename: "Earnings_Statement.pdf",
        url: "#",
      },
      {
        id: "img1",
        label: "ID Photo",
        filename: "IMG_4947.jpg",
        url: "#",
      },
      {
        id: "img2",
        label: "Additional Doc",
        filename: "IMG_5275.jpg",
        url: "#",
      },
      {
        id: "doc",
        label: "Reference Letter",
        filename: "document.pdf",
        url: "#",
      },
      {
        id: "img3",
        label: "Photo ID",
        filename: "IMG_4948.jpg",
        url: "#",
      },
    ],
    notes: "Application complete. Awaiting screening results.",
  },
];

export const journeySteps = [
  { key: 0, label: "Lead", description: "Initial details and pre-screening info" },
  { key: 1, label: "Application", description: "Responses to industry-standard questions" },
  { key: 2, label: "Screening", description: "Credit and background results delivered" },
  { key: 3, label: "Verification", description: "Proof of income and renter docs verified" },
  { key: 4, label: "Decision", description: "You review and choose to accept or reject" },
];

export function getStatusLabel(status: Applicant["status"]): string {
  const labels: Record<string, string> = {
    complete: "Complete",
    pending: "Pending",
    screening: "Screening",
    verified: "Verified",
    accepted: "Accepted",
    rejected: "Rejected",
  };
  return labels[status] || status;
}

export function getStatusColor(status: Applicant["status"]): string {
  const colors: Record<string, string> = {
    complete: "bg-green text-white",
    pending: "bg-amber text-white",
    screening: "bg-navy text-white",
    verified: "bg-blue text-white",
    accepted: "bg-green text-white",
    rejected: "bg-red text-white",
  };
  return colors[status] || "bg-slate-500 text-white";
}
