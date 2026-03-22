import src1 from "@/assets/source-project-1.jpg";
import src2 from "@/assets/source-project-2.jpg";
import src3 from "@/assets/source-project-3.jpg";
import src4 from "@/assets/source-project-4.jpg";
import src5 from "@/assets/source-project-5.jpg";
import src6 from "@/assets/source-project-6.jpg";
import src7 from "@/assets/source-project-7.jpg";
import src8 from "@/assets/source-project-8.jpg";
import src9 from "@/assets/source-project-9.jpg";
import src10 from "@/assets/source-project-10.jpg";
import src11 from "@/assets/source-project-11.jpg";

// New real project images
import austinHighRise01 from "@/assets/austin_high-rise-01.jpg";
import austinHighRise02 from "@/assets/austin_high-rise-02.jpg";
import bridgeportOffice01 from "@/assets/bridgeport_office_building-01.jpg";
import bridgeportOffice02 from "@/assets/bridgeport_office_building-02.jpg";
import bridgeportOffice03 from "@/assets/bridgeport_office_building-03.jpg";
import fletcherTownhouses01 from "@/assets/fletcher_townhouses-01.jpg";
import wellingtonMixUse01 from "@/assets/wellington_mix-use-01.jpg";
import fiftyFourthAveCondo01 from "@/assets/54th_ave_condo-01.jpg";
import fiftyFourthAveCondo02 from "@/assets/54th_ave_condo-02.jpg";
import fiftyFourthAveCondo03 from "@/assets/54th_ave_condo-03.jpg";

// ── Types ──────────────────────────────────────────────

export interface FeaturedProject {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  location: string;
  area?: string;
  budget?: string;
  designer?: string;
  coDesigner?: string;
  codes?: string;
  notes?: string;
  desc: string;
  longDesc: string;
  services: string[];
  heroImg: string;
  galleryImgs: string[];
  coverImg: string;
}

export interface CollectionProject {
  name: string;
  location: string;
  area?: string;
  coDesigner?: string;
  budget?: string;
  designer?: string;
  codes?: string;
  notes?: string;
  img: string;
}

export interface Collection {
  slug: string;
  title: string;
  categorySlug: string;
  desc: string;
  coverImg: string;
  projects: CollectionProject[];
}

// ── Filter Categories ──────────────────────────────────

export const categories = [
  { slug: "all", label: "All" },
  { slug: "residential", label: "Residential" },
  { slug: "multi-unit-housing", label: "Multi-Unit Housing" },
  { slug: "commercial-industrial", label: "Commercial & Industrial" },
  { slug: "master-planning", label: "Master Planning" },
];

// ── Featured Projects ──────────────────────────────────

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "chen-residence",
    title: "Chen Residence",
    category: "Residential",
    categorySlug: "residential",
    location: "West Vancouver, BC",
    area: "6,729 sq. ft.",
    notes: "CHBA National SAM Awards Finalist",
    desc: "A refined single-family residence in West Vancouver, recognized as a finalist for the CHBA National SAM Awards.",
    longDesc: "The Chen Residence is a thoughtfully composed home that balances dramatic West Coast siting with refined interior proportions. At 6,729 square feet, the design prioritizes clear spatial sequences, natural light modulation, and a restrained material palette that defers to the surrounding landscape. The project earned recognition as a CHBA National SAM Awards Finalist — a testament to the level of craft and design integrity achieved throughout.",
    services: ["Integrated Building Design", "Code Consultation", "Project Management"],
    heroImg: src1,
    galleryImgs: [src2, src3],
    coverImg: src1,
  },
  {
    slug: "han-residence",
    title: "Han Residence",
    category: "Residential",
    categorySlug: "residential",
    location: "Delta, BC",
    area: "6,078 sq. ft.",
    coDesigner: "John Han (Interior)",
    desc: "A spacious family home in Delta designed in collaboration, blending architectural form with curated interior detail.",
    longDesc: "The Han Residence is a 6,078 square-foot custom home developed through a close design collaboration. The architectural envelope establishes a contemporary silhouette while the interior — guided by co-designer John Han — introduces a layered material language that brings warmth and personality to the living spaces. Every room has been considered as part of a continuous spatial narrative.",
    services: ["Integrated Building Design", "Code Consultation"],
    heroImg: src4,
    galleryImgs: [src5, src6],
    coverImg: src4,
  },
  {
    slug: "severn-residence",
    title: "Severn Residence",
    category: "Residential",
    categorySlug: "residential",
    location: "Richmond, BC",
    desc: "A contemporary single-family residence in Richmond with clean proportions and considered detailing.",
    longDesc: "The Severn Residence demonstrates that strong architecture doesn't require excess. Designed with a disciplined approach to massing, fenestration, and material selection, this Richmond home delivers a quiet confidence. The floor plan is organized to maximize natural daylight and visual connection between interior living spaces and the surrounding landscape.",
    services: ["Integrated Building Design", "Code Consultation"],
    heroImg: src7,
    galleryImgs: [src8, src9],
    coverImg: src7,
  },
  {
    slug: "xu-residence",
    title: "Xu Residence",
    category: "Residential",
    categorySlug: "residential",
    location: "Richmond, BC",
    area: "3,680 sq. ft.",
    desc: "A compact yet spatially generous custom home in Richmond, thoughtfully planned at 3,680 square feet.",
    longDesc: "The Xu Residence is proof that careful design can make a modest footprint feel expansive. At 3,680 square feet, every element has been optimized — from ceiling heights and window placements to circulation paths and storage integration. The result is a home that feels open, bright, and effortlessly livable without relying on excessive square footage.",
    services: ["Integrated Building Design", "Code Consultation"],
    heroImg: src10,
    galleryImgs: [src11, src1],
    coverImg: src10,
  },
  {
    slug: "bridgeport-office",
    title: "Bridgeport Office Building",
    category: "Commercial & Industrial",
    categorySlug: "commercial-industrial",
    location: "Richmond, BC",
    area: "28,703 sq. ft.",
    budget: "$10 million",
    desc: "A substantial office development in Richmond delivering 28,703 square feet of contemporary commercial workspace.",
    longDesc: "The Bridgeport Office Building is a significant commercial project in Richmond, encompassing 28,703 square feet of Class A office space. The design responds to the scale and context of the Bridgeport corridor while establishing a distinctive architectural identity. Floor plates are organized for maximum flexibility, and the building envelope integrates high-performance glazing systems that reduce energy consumption without compromising natural light. The $10 million project represents Architect 57's capability in delivering large-scale commercial work with precision and fiscal responsibility.",
    services: ["Integrated Building Design", "Code Consultation (CP)", "Project Management", "BIM"],
    heroImg: bridgeportOffice01,
    galleryImgs: [bridgeportOffice02, bridgeportOffice03],
    coverImg: bridgeportOffice01,
  },
  {
    slug: "collingwood",
    title: "Collingwood",
    category: "Multi-Unit Housing",
    categorySlug: "multi-unit-housing",
    location: "Vancouver, BC",
    area: "10,500 sq. ft.",
    budget: "$5 million",
    desc: "A 10,500 square-foot multi-unit residential development in Vancouver's Collingwood neighbourhood.",
    longDesc: "The Collingwood project is a multi-unit residential development that navigates Vancouver's evolving density requirements while maintaining architectural quality. At 10,500 square feet with a $5 million budget, the design achieves a balance between construction economy and design ambition. Each unit is individually planned to maximize livability, with careful attention to privacy, natural light, and outdoor connections despite the compact urban site.",
    services: ["Integrated Building Design", "Code Consultation", "Project Management"],
    heroImg: src6,
    galleryImgs: [src8, src9],
    coverImg: src6,
  },
  {
    slug: "sqn-education",
    title: "SQN Education",
    category: "Commercial & Industrial",
    categorySlug: "commercial-industrial",
    location: "Richmond, BC",
    designer: "ID Design Consulting Ltd.",
    codes: "Architect 57 Inc.",
    desc: "An education facility in Richmond designed for creative learning environments, with code compliance by Architect 57.",
    longDesc: "SQN Education is a purpose-built educational facility in Richmond, designed by ID Design Consulting Ltd. with building code and compliance services provided by Architect 57 Inc. The project demanded careful adherence to BC Building Code requirements for assembly and institutional occupancies, including life safety, accessibility, and structural standards. The result is a facility that supports contemporary pedagogy within a safe, code-compliant architectural framework.",
    services: ["Code Consultation (CP)", "Building Code Compliance"],
    heroImg: src3,
    galleryImgs: [src5, src7],
    coverImg: src3,
  },
];

// ── Collections ────────────────────────────────────────

export const collections: Collection[] = [
  {
    slug: "residential",
    title: "Residential",
    categorySlug: "residential",
    desc: "Custom residential homes across the Lower Mainland — from West Vancouver estates to Richmond family homes.",
    coverImg: src10,
    projects: [
      { name: "No6 Residence", location: "Richmond, BC", img: src11 },
      { name: "Vinson Creek Residence", location: "West Vancouver, BC", area: "9,343 sq. ft.", coDesigner: "Angel Wang", img: src1 },
      { name: "Wu Residence", location: "West Vancouver, BC", area: "6,733 sq. ft.", img: src4 },
      { name: "Lu Residence", location: "Delta, BC", area: "5,177 sq. ft.", img: src7 },
      { name: "Cartier Residence", location: "Vancouver, BC", img: src2 },
      { name: "Laurel Residence", location: "Vancouver, BC", img: src5 },
    ],
  },
  {
    slug: "multi-unit-housing",
    title: "Multi-Unit Housing",
    categorySlug: "multi-unit-housing",
    desc: "High-rise towers, mixed-use developments, townhouse communities, and multiplex projects across British Columbia.",
    coverImg: austinHighRise01,
    projects: [
      { name: "Austin High-Rise", location: "Coquitlam, BC", area: "77,527 sq. ft.", budget: "$25 million", img: austinHighRise01 },
      { name: "54th Ave Condo (12-Storey)", location: "Langley, BC", notes: "12-storey with underground parking", img: fiftyFourthAveCondo01 },
      { name: "Wellington Mixed-Use", location: "Chilliwack, BC", area: "90,740 sq. ft.", budget: "$20 million", img: wellingtonMixUse01 },
      { name: "54th Ave Condo (4-Storey)", location: "Langley, BC", notes: "4-storey with underground parking", img: fiftyFourthAveCondo02 },
      { name: "Fletcher Townhouses", location: "Maple Ridge, BC", notes: "15 units across 5 types", img: fletcherTownhouses01 },
      { name: "Royal Oak", location: "Burnaby, BC", area: "12,627 sq. ft.", budget: "$5.45 million", img: fiftyFourthAveCondo03 },
      { name: "West 39 Avenue", location: "Vancouver, BC", area: "4,438 sq. ft.", budget: "$1.78 million", img: austinHighRise02 },
      { name: "Seavale", location: "Richmond, BC", area: "4,658 sq. ft.", budget: "$1.39 million", img: src7 },
    ],
  },
  {
    slug: "commercial-industrial",
    title: "Commercial & Industrial",
    categorySlug: "commercial-industrial",
    desc: "Purpose-built commercial, educational, and childcare facilities designed for safety, creativity, and functionality.",
    coverImg: src5,
    projects: [
      { name: "East 2nd Avenue", location: "Vancouver, BC", img: src5 },
      { name: "Phi Education", location: "Vancouver, BC", img: src8 },
      { name: "Little Marines Preschool", location: "Coquitlam, BC", designer: "Yan Design Studio", codes: "Architect 57 Inc.", img: src9 },
      { name: "Happy May IV", location: "Richmond, BC", img: src1 },
    ],
  },
  {
    slug: "master-planning",
    title: "Master Planning",
    categorySlug: "master-planning",
    desc: "Large-scale planning projects from community estates to institutional campus developments.",
    coverImg: src11,
    projects: [
      { name: "Zone 5, Union Bay Estate", location: "Union Bay, BC", area: "1,189,000 sq. ft. (27.30 acres)", img: src2 },
      { name: "New University Hospital of Northern BC", location: "Prince George, BC", area: "277,000 sq. ft.", budget: "$700 million", img: src6 },
      { name: "Dubai House of the Future Competition", location: "Dubai, UAE", area: "570,000 sq. ft. (13.09 acres)", img: src3 },
    ],
  },
];

// ── Flat list of ALL projects for grid display ─────────

export interface GridProject {
  name: string;
  category: string;
  categorySlug: string;
  location: string;
  area?: string;
  budget?: string;
  notes?: string;
  img: string;
  detailLink?: string; // only for featured projects
}

export const allGridProjects: GridProject[] = [
  // Featured projects included in the grid
  ...featuredProjects.map((p) => ({
    name: p.title,
    category: p.category,
    categorySlug: p.categorySlug,
    location: p.location,
    area: p.area,
    budget: p.budget,
    notes: p.notes,
    img: p.coverImg,
    detailLink: `/projects/${p.slug}`,
  })),
  // Collection projects flattened into the grid
  ...collections.flatMap((c) =>
    c.projects.map((p) => ({
      name: p.name,
      category: c.title,
      categorySlug: c.categorySlug,
      location: p.location,
      area: p.area,
      budget: p.budget,
      notes: p.notes,
      img: p.img,
    }))
  ),
];
