export interface Attachment {
  id: string;
  label: string;
  filename: string;
  url: string;
}

export interface ApplicationAddress {
  label: string;
  street: string;
  cityState: string;
  type: string;
  rent: string;
  reasonForMoving: string;
  landlordName: string;
  landlordPhone: string;
}

export interface ApplicationJob {
  employer: string;
  jobTitle: string;
  period: string;
  income: string;
  isCurrent: boolean;
  referenceName: string;
  referencePhone: string;
}

export interface ApplicationDetails {
  dateOfBirth: string;
  applicationStatus: string;
  desiredMoveInDate: string;
  totalOccupants: string;
  selfReportedIncome: string;
  animals: string;
  smoking: string;
  addresses: ApplicationAddress[];
  totalIncome: string;
  jobs: ApplicationJob[];
  financialInstitution: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  vehicle: {
    make: string;
    color: string;
    year: string;
  };
  backgroundQuestions: {
    question: string;
    answer: string;
  }[];
  otherInfo: {
    specialRequests: string;
    howDidYouHear: string;
    comments: string;
  };
}

export interface ScreeningReport {
  creditScore: number;
  creditScoreLabel: string;
  receivedDate: string;
  scoreFactors: string[];
  evictions: number;
  collections: number;
  publicRecords: number;
  criminalHistory: number;
  addresses: { address: string; status: string; date: string }[];
  employers: { employer: string; jobTitle: string; date: string }[];
  profileSummary: {
    tradelines: number;
    collections: string;
    publicRecords: string;
    inquiries: number;
    negativeTradelines: number;
    historicalNegatives: number;
    occurrencesOfNegatives: number;
  };
  tradelineSummaries: {
    creditType: string;
    count: number;
    highCredit: string;
    creditLimit: string;
    balance: string;
    pastDue: string;
    payment: string;
    available: string;
  }[];
  tradelines: {
    name: string;
    type: string;
    terms: string;
    status: string;
    opened: string;
    lastPaid: string;
    usage: string;
    payment: string;
    pastDue: string;
  }[];
}

export interface Applicant {
  id: string;
  name: string;
  initials: string;
  address: string;
  moveInDate: string;
  submittedDate: string;
  status: "complete" | "pending" | "screening" | "verified" | "accepted" | "rejected";
  journeyStage: number;
  email: string;
  phone: string;
  attachments: Attachment[];
  notes: string;
  applicationDetails: ApplicationDetails;
  screeningReport: ScreeningReport;
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
    email: "4acarnail@gmail.com",
    phone: "(314) 566-0963",
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
    notes: "Application complete. Screening report received.",
    applicationDetails: {
      dateOfBirth: "June 19, 1996",
      applicationStatus: "Complete",
      desiredMoveInDate: "08/01/2026",
      totalOccupants: "1 adult | 0 minor",
      selfReportedIncome: "$3,600 / month",
      animals: "No",
      smoking: "No",
      addresses: [
        {
          label: "Current Address",
          street: "29 Boniface Dr",
          cityState: "Pine Bush, NY 12566",
          type: "Rental",
          rent: "$600 rent / month",
          reasonForMoving: "Cutting down on roommates",
          landlordName: "Abhi",
          landlordPhone: "(845) 905-5220",
        },
        {
          label: "Past Address",
          street: "2 maple ave",
          cityState: "Newburgh, NY 12550",
          type: "Rental",
          rent: "$375 rent / month",
          reasonForMoving: "Landlord wanted less tenants",
          landlordName: "Lilly Alvarado",
          landlordPhone: "(845) 542-3316",
        },
      ],
      totalIncome: "$3,600.00 / month",
      jobs: [
        {
          employer: "Garnet health",
          jobTitle: "Cardiology technician",
          period: "Jan 2023 - Present",
          income: "$2,000.00 / month",
          isCurrent: true,
          referenceName: "Jessica santos",
          referencePhone: "(845) 399-2153",
        },
        {
          employer: "Northwell health Kingston medical mall clinic",
          jobTitle: "EEG/ekg technician",
          period: "Oct 2025 - Present",
          income: "$1,600.00 / month",
          isCurrent: true,
          referenceName: "Jonlyn Maraday",
          referencePhone: "(475) 237-0071",
        },
        {
          employer: "Garnet health -Catskil",
          jobTitle: "EKG technician",
          period: "Dec 2021 - Dec 2022",
          income: "$1,000.00 / month",
          isCurrent: false,
          referenceName: "Dina Norman",
          referencePhone: "8455274403",
        },
      ],
      financialInstitution: "N/A",
      emergencyContact: {
        name: "Alda Carnell",
        relationship: "Mother",
        phone: "(314) 368-8380",
      },
      vehicle: {
        make: "Volkswagen Tiguan",
        color: "Black",
        year: "2019",
      },
      backgroundQuestions: [
        {
          question: "Have you (or any person you have named on this application) ever been evicted from a tenancy or left owing money?",
          answer: "No",
        },
        {
          question: "Have you or any member of your household ever been convicted of (or pled guilty or no contest to) any criminal offense(s) other than a minor infraction(s)?",
          answer: "No",
        },
        {
          question: "Have you (or any person you have named on this application) ever filed for or been involved in a bankruptcy, been foreclosed on, or been a defendant in a civil suit?",
          answer: "No",
        },
      ],
      otherInfo: {
        specialRequests: "No",
        howDidYouHear: "Apartments.com",
        comments: "No response given.",
      },
    },
    screeningReport: {
      creditScore: 661,
      creditScoreLabel: "Good",
      receivedDate: "06/03/2026",
      scoreFactors: [
        "Not enough available credit on revolving accounts",
        "Recency of a balance overlimit on a bankcard account",
        "Too many serious derogatory items",
        "Insufficient payment activity over the last year",
      ],
      evictions: 0,
      collections: 0,
      publicRecords: 0,
      criminalHistory: 0,
      addresses: [
        {
          address: "29 BONIFACE DR Unit 1, PINE BUSH, NY 12566",
          status: "Current",
          date: "07/01/2021",
        },
      ],
      employers: [
        { employer: "BJC HOSPITAL", jobTitle: "PATIENT CARE TECH", date: "12/01/2018" },
        { employer: "SSM ST JOSEPH", jobTitle: "PATIENT CARE TECH", date: "01/01/2017" },
      ],
      profileSummary: {
        tradelines: 10,
        collections: "-",
        publicRecords: "-",
        inquiries: 1,
        negativeTradelines: 2,
        historicalNegatives: 2,
        occurrencesOfNegatives: 10,
      },
      tradelineSummaries: [
        { creditType: "Revolving", count: 7, highCredit: "$16,986", creditLimit: "$16,986", balance: "$13,475", pastDue: "$10,023", payment: "$100", available: "21%" },
        { creditType: "Installment", count: 3, highCredit: "$22,500", creditLimit: "$22,500", balance: "-", pastDue: "$0", payment: "-", available: "-" },
        { creditType: "Closed w/ Bal", count: 1, highCredit: "$10,954", creditLimit: "$10,954", balance: "$10,023", pastDue: "$10,023", payment: "-", available: "8%" },
        { creditType: "Total", count: 10, highCredit: "$39,486", creditLimit: "$39,486", balance: "$13,475", pastDue: "$10,023", payment: "$100", available: "66%" },
      ],
      tradelines: [
        { name: "VANTAGE CU", type: "Revolving Min", terms: "Joint Contract Liability", status: "Open", opened: "Nov 2017", lastPaid: "Apr 2026", usage: "88% of $2,754", payment: "$73", pastDue: "$0" },
        { name: "DISCOVERCARD", type: "Revolving", terms: "Individual Account", status: "Open", opened: "Jul 2016", lastPaid: "May 2026", usage: "92% of $10,954", payment: "-", pastDue: "$10,023" },
        { name: "GS BANK USA", type: "Revolving Min", terms: "Individual Account", status: "Open", opened: "Jun 2022", lastPaid: "Mar 2026", usage: "66% of $1,554", payment: "$27", pastDue: "$0" },
        { name: "CAPITAL ONE", type: "Revolving", terms: "Individual Account", status: "Closed", opened: "Dec 2018", lastPaid: "Feb 2026", usage: "-", payment: "-", pastDue: "$0" },
        { name: "DISCOVER PL", type: "Installment", terms: "Individual Account", status: "Closed", opened: "Jun 2022", lastPaid: "Jun 2025", usage: "-", payment: "$0", pastDue: "$0" },
        { name: "CB/VICSCRT", type: "Revolving", terms: "Individual Account", status: "Closed", opened: "Nov 2017", lastPaid: "Feb 2024", usage: "-", payment: "-", pastDue: "$0" },
        { name: "SYNCB/JCP DC", type: "Revolving", terms: "Individual Account", status: "Open", opened: "Dec 2021", lastPaid: "-", usage: "-", payment: "-", pastDue: "-" },
        { name: "CAPITAL ONE", type: "Revolving", terms: "Individual Account", status: "Open", opened: "Sep 2019", lastPaid: "-", usage: "-", payment: "-", pastDue: "-" },
        { name: "DISCOVER PL", type: "Installment", terms: "Individual Account", status: "Closed", opened: "Jul 2021", lastPaid: "Jun 2022", usage: "-", payment: "$0", pastDue: "$0" },
        { name: "ARSENAL CU", type: "Installment", terms: "Individual Account", status: "Closed", opened: "Apr 2019", lastPaid: "Mar 2021", usage: "-", payment: "$0", pastDue: "$0" },
      ],
    },
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
