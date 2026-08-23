export interface Vacancy {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  deadline: string;
  description: string;
  isOpen: boolean;
}

export const initialVacancies: Vacancy[] = [
  { id: "j1", title: "Senior Civil Engineer", type: "Full-Time", location: "On-Site (Upper Gumu)", department: "Engineering", deadline: "2026-09-30", description: "Lead civil engineering works on site.", isOpen: true },
  { id: "j2", title: "Environmental Health & Safety Manager", type: "Full-Time", location: "Regional Office", department: "Operations", deadline: "2026-09-15", description: "Manage EHS compliance across all plant sites.", isOpen: true },
  { id: "j3", title: "Hydrologist", type: "Full-Time", location: "Headquarters", department: "R&D", deadline: "2026-10-01", description: "Analyze hydrological data to optimize generation output.", isOpen: false },
];

export const careersStorageKey = "gumuk-khola-vacancies";
