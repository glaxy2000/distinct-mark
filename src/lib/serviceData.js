import { Building2, Zap, Monitor, UtensilsCrossed, ShoppingCart, Truck, Wrench } from "lucide-react";

export const services = [
  {
    id: "construction",
    title: "Construction & Infrastructure",
    shortTitle: "Construction",
    icon: Building2,
    color: "#3B5998",
    gradient: "from-[#3B5998] to-[#6B7B9E]",
    description: "End-to-end construction and infrastructure solutions including general contracting, labour camp construction, building renovation, and civil works.",
    subServices: [
      "General Contracting",
      "Labour Camp Construction & Maintenance",
      "Building Construction & Renovation",
      "Civil Works",
      "Interior Fit-Out Works"
    ]
  },
  {
    id: "electrical",
    title: "Electrical & Mechanical",
    shortTitle: "E&M",
    icon: Zap,
    color: "#E8832A",
    gradient: "from-[#E8832A] to-[#F5A623]",
    description: "Comprehensive electrical and mechanical engineering services covering installation, maintenance, HVAC, plumbing, and full MEP contracting.",
    subServices: [
      "Electrical Installation & Maintenance",
      "Mechanical Works",
      "HVAC Installation & Maintenance",
      "Plumbing Services",
      "MEP Contracting"
    ]
  },
  {
    id: "it",
    title: "IT & Technical Services",
    shortTitle: "IT Services",
    icon: Monitor,
    color: "#0EA5E9",
    gradient: "from-[#0EA5E9] to-[#38BDF8]",
    description: "Cutting-edge IT solutions including network installation, security systems, software & hardware supply, and system integration.",
    subServices: [
      "IT Support & Network Installation",
      "CCTV & Security Systems",
      "Software & Hardware Supply",
      "System Integration Services"
    ]
  },
  {
    id: "catering",
    title: "Catering & Hospitality",
    shortTitle: "Catering",
    icon: UtensilsCrossed,
    color: "#16A34A",
    gradient: "from-[#16A34A] to-[#4ADE80]",
    description: "Premium catering and hospitality management services for industrial sites, camps, restaurants, and food supply operations.",
    subServices: [
      "Industrial Catering Services",
      "Camp Catering Services",
      "Restaurant Operation & Management",
      "Food Supply Services"
    ]
  },
  {
    id: "trading",
    title: "Trading & Retail",
    shortTitle: "Trading",
    icon: ShoppingCart,
    color: "#DC2626",
    gradient: "from-[#DC2626] to-[#F87171]",
    description: "Diverse trading and retail operations spanning supermarkets, general trading, building materials, and electrical equipment.",
    subServices: [
      "Supermarket Operations",
      "General Trading",
      "Building Materials Trading",
      "Electrical & Mechanical Equipment Trading"
    ]
  },
  {
    id: "transport",
    title: "Transportation & Logistics",
    shortTitle: "Transport",
    icon: Truck,
    color: "#1E3A5F",
    gradient: "from-[#1E3A5F] to-[#3B6B9E]",
    description: "Reliable transportation and logistics support including staff transport, equipment hauling, and comprehensive logistics management.",
    subServices: [
      "Transportation Services",
      "Staff Transportation",
      "Equipment Transportation",
      "Logistics Support Services"
    ]
  },
  {
    id: "equipment",
    title: "Equipment Rental",
    shortTitle: "Equipment",
    icon: Wrench,
    color: "#1A1A1A",
    gradient: "from-[#1A1A1A] to-[#E8832A]",
    description: "Wide range of equipment rental services including heavy machinery, construction equipment, generators, and specialized machinery.",
    subServices: [
      "Heavy Equipment Rental",
      "Construction Equipment Rental",
      "Generator Rental",
      "Machinery Rental"
    ]
  }
];

export const heroImages = {
  construction: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/3e3d12aed_generated_0e683742.png",
  electrical: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/f0310151e_generated_be0fbcd4.png",
  it: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/3619f610f_generated_86fbea82.png",
  catering: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/76067f04a_generated_7384dfdb.png",
  trading: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/9af5e979c_generated_635bd2f5.png",
  transport: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/e6408a8a1_generated_a5adc5ac.png",
  equipment: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/c1cf3c225_generated_51916fdb.png",
  main: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/2ff4dd396_generated_ceb8505e.png",
  about: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/f57bbeb48_generated_8ffbbd5e.png"
};

export const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "500+", label: "Projects Completed" },
  { value: "7", label: "Business Divisions" },
  { value: "2000+", label: "Team Members" }
];