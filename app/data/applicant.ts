export interface TownInfo {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
}

export interface WatchtowerFacility {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  distance: string;
  driveTime: string;
  description: string;
}

export interface KingdomHall {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: string;
  phone?: string;
}

export interface AssemblyHall {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: string;
  note?: string;
}

export const townTitle = "About 60 Walker St";
export const townSubtitle =
  "A welcoming shared home in the heart of the Hudson Valley";

export const townInfos: TownInfo[] = [
  {
    id: "general",
    title: "General Information",
    description:
      "Walden is the largest of three villages in the Town of Montgomery, Orange County, New York. Nestled along the Wallkill River, it offers a peaceful small-town atmosphere with easy access to major conveniences.",
    details: [
      "Population: ~6,978 (2010 census)",
      "County: Orange County, NY",
      "ZIP Code: 12586",
      "Area code: 845",
      "Part of the Town of Montgomery",
      "Located along the Wallkill River",
    ],
    icon: "MapPin",
  },
  {
    id: "nearby",
    title: "What's Nearby",
    description:
      "Walden sits in the beautiful Hudson Valley, surrounded by natural beauty and within reach of major attractions.",
    details: [
      "Hudson Valley region — renowned for scenic beauty",
      "Shawangunk Mountains & Shawangunk Ridge nearby",
      "Minnewaska State Park Preserve — 22,275 acres",
      "Mohonk Preserve — hiking and climbing",
      "Stewart State Forest — outdoor recreation",
      "Woodbury Common Premium Outlets — major shopping",
    ],
    icon: "Mountain",
  },
  {
    id: "medical",
    title: "Medical & Healthcare",
    description:
      "Quality healthcare is accessible within a short drive, with hospitals and clinics serving the Orange County area.",
    details: [
      "Orange Regional Medical Center — Middletown, NY",
      "St. Luke's Cornwall Hospital — Cornwall, NY",
      "Crystal Run Healthcare — multiple locations",
      "Montefiore St. Luke's Cornwall — Newburgh",
      "Urgent care centers in Newburgh & Middletown",
    ],
    icon: "HeartPulse",
  },
  {
    id: "shopping",
    title: "Shopping & Dining",
    description:
      "From local village shops to major retail centers, everything you need is close by.",
    details: [
      "Local shops & dining in Walden village center",
      "Galleria at Crystal Run — Middletown mall",
      "Woodbury Common Premium Outlets — designer shopping",
      "Walmart, Target, Costco in Middletown/Newburgh",
      "Local farmers markets seasonally",
    ],
    icon: "ShoppingBag",
  },
  {
    id: "transportation",
    title: "Transportation",
    description:
      "Walden is well-connected to major travel corridors, with multiple transit options within easy reach.",
    details: [
      "Stewart International Airport (SWF) — ~20 miles",
      "Newark Liberty (EWR) — ~70 miles",
      "JFK & LaGuardia — ~75–90 miles",
      "Short Line / Coach USA bus service",
      "Trailways bus lines",
      "Metro-North Port Jervis line — Middletown station",
      "Amtrak — Poughkeepsie station (~30 miles)",
      "Interstate 84 — ~8 miles",
      "Interstate 87 / NY Thruway — ~15 miles",
    ],
    icon: "Bus",
  },
];

export const watchtowerFacilities: WatchtowerFacility[] = [
  {
    id: "warwick",
    name: "World Headquarters",
    type: "Bethel — World HQ",
    address: "1 Kings Dr, Tuxedo Park, NY 10987",
    phone: "+1 (845) 524-3000",
    distance: "~31 miles",
    driveTime: "~35 min",
    description:
      "The global headquarters of Jehovah's Witnesses. Features museum exhibits and self-guided tours showcasing the organization's history and worldwide work.",
  },
  {
    id: "patterson",
    name: "Watchtower Educational Center",
    type: "Bethel — Educational",
    address: "100 Watchtower Dr, Patterson, NY 12563",
    phone: "+1 (845) 306-1000",
    distance: "~38 miles",
    driveTime: "~50 min",
    description:
      "Educational center housing the Watchtower Bible School of Gilead and other training facilities. Includes a visitor center with exhibits.",
  },
  {
    id: "wallkill",
    name: "Watchtower Farms",
    type: "Bethel — Branch Office",
    address: "900 Red Mills Rd, Wallkill, NY 12589",
    phone: "+1 (845) 744-6000",
    distance: "~16 miles",
    driveTime: "~24 min",
    description:
      "Branch office and agricultural facility supporting the worldwide work of Jehovah's Witnesses. Includes printing and shipping operations.",
  },
];

export const kingdomHalls: KingdomHall[] = [
  {
    id: "walden",
    name: "Walden Congregation",
    address: "Walden, NY 12586",
    city: "Walden",
    distance: "Local",
  },
  {
    id: "montgomery",
    name: "Montgomery Congregation",
    address: "Montgomery, NY",
    city: "Montgomery",
    distance: "~3 miles",
  },
  {
    id: "wallkill-kh",
    name: "Wallkill Congregation",
    address: "Wallkill, NY",
    city: "Wallkill",
    distance: "~16 miles",
  },
  {
    id: "cornwall",
    name: "Cornwall / New Windsor Congregation",
    address: "25 Beakes Rd, New Windsor, NY 12553",
    city: "New Windsor",
    distance: "~18 miles",
  },
  {
    id: "middletown",
    name: "Middletown Congregation",
    address: "511 Mt Hope Rd, Middletown, NY 10940",
    city: "Middletown",
    distance: "~20 miles",
    phone: "(845) 343-3422",
  },
  {
    id: "newburgh",
    name: "Newburgh Congregation",
    address: "Newburgh, NY",
    city: "Newburgh",
    distance: "~22 miles",
  },
  {
    id: "marlboro",
    name: "Marlboro Congregation",
    address: "Marlboro, NY",
    city: "Marlboro",
    distance: "~25 miles",
  },
  {
    id: "milton",
    name: "Milton Congregation",
    address: "Milton, NY",
    city: "Milton",
    distance: "~30 miles",
  },
];

export const assemblyHalls: AssemblyHall[] = [];

export const assemblyHallNote =
  "No Assembly Halls of Jehovah's Witnesses are located within a 100-mile radius of Walden, NY. The nearest Assembly Halls are in Jersey City, NJ (Stanley Theater) and on Long Island, both approximately 60–75 miles away. Special events and larger gatherings are typically held at rented facilities or convention centers in the region.";

export interface PricingInfo {
  monthlyRent: string;
  deposit: string;
  utilitiesIncluded: string[];
  additionalNotes: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
}

export interface ScheduleTour {
  headline: string;
  description: string;
  contactEmail: string;
}

export const pricingInfo: PricingInfo = {
  monthlyRent: "Call for price",
  deposit: "",
  utilitiesIncluded: ["High-Speed WiFi", "Electric", "Water", "Trash Removal"],
  additionalNotes: [
    "Heat is gas — split evenly among roommates",
    "Private bedroom with shared kitchen, bathroom, and living spaces",
    "Furnished common areas — bring your own bedroom furniture",
    "1st month rent plus deposit once approved",
    "Renters insurance policy required",
  ],
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Living at 60 Walker was the best decision I made. The house is warm, the roommates became family, and Walden is such a peaceful place to recharge after a long day.",
  },
  {
    id: "t2",
    quote:
      "I was nervous about shared housing, but this place felt like home from day one. Great location, quiet neighborhood, and genuinely good people.",
  },
];

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  label: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  { id: "front", src: "/walkerfront.jpeg", alt: "Front exterior of 60 Walker St", label: "Front Exterior" },
  { id: "kitchen", src: "/walkerkitchen.jpeg", alt: "Shared kitchen at 60 Walker St", label: "Kitchen" },
  { id: "dining", src: "/walkerdining.jpeg", alt: "Dining area at 60 Walker St", label: "Dining Area" },
  { id: "bath", src: "/walkerbath.jpeg", alt: "Bathroom at 60 Walker St", label: "Bathroom" },
];

export const watchtowerGalleryPhotos: GalleryPhoto[] = [
  { id: "warwick", src: "/warwickbethel.webp", alt: "World Headquarters in Warwick, NY", label: "Warwick World HQ" },
  { id: "paterson", src: "/patersonbethel.jpg", alt: "Watchtower Educational Center in Patterson, NY", label: "Patterson Educational Center" },
  { id: "wallkill", src: "/wallkillbethel.jpg", alt: "Watchtower Farms in Wallkill, NY", label: "Wallkill Farms" },
];

export const townGalleryPhotos: GalleryPhoto[] = [
  { id: "skyline", src: "/Walden,_NY,_skyline_2.jpg", alt: "Walden, NY skyline", label: "Walden Skyline" },
  { id: "villagehall", src: "/Walden_Village_Hall.jpg", alt: "Walden Village Hall", label: "Village Hall" },
  { id: "fall", src: "/waldebfall.jpg", alt: "Walden in autumn", label: "Walden in Fall" },
  { id: "sign", src: "/waldensign.jpg", alt: "Walden village welcome sign", label: "Walden Village Sign" },
];

export const waldenMapEmbed =
  "https://maps.google.com/maps?q=Walden,+NY&hl=en&z=11&ie=UTF8&output=embed";

export const scheduleTour: ScheduleTour = {
  headline: "Schedule a Tour",
  description:
    "See the space in person and meet the current roommates. Tours are available by appointment only. Please email to schedule.",
  contactEmail: "home@60walkerst.com",
};
