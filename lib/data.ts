export interface Project {
  id: string;
  name: string;
  location: string;
  capacityMW: number;
  status: 'Operational' | 'Under Construction' | 'Planning';
  commissioningYear?: number;
  image: string;
  description: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const stats: Stat[] = [
  { id: '1', label: 'Total Capacity', value: 120, suffix: 'MW' },
  { id: '2', label: 'Operational Plants', value: 4 },
  { id: '3', label: 'CO2 Offset Annually', value: 350, suffix: 'k Tons' },
  { id: '4', label: 'Homes Powered', value: 85, suffix: 'k+' },
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Gumu Khola A',
    location: 'District X, Region Y',
    capacityMW: 45,
    status: 'Operational',
    commissioningYear: 2018,
    image: 'https://images.unsplash.com/photo-1549424840-7ab3fba0132b?auto=format&fit=crop&q=80',
    description: 'Our flagship run-of-river project providing clean energy to the regional grid.'
  },
  {
    id: 'p2',
    name: 'Gumu Khola B',
    location: 'District X, Region Y',
    capacityMW: 35,
    status: 'Operational',
    commissioningYear: 2020,
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80',
    description: 'A critical expansion project improving grid stability during peak hours.'
  },
  {
    id: 'p3',
    name: 'Upper Gumu',
    location: 'District Z, Region Y',
    capacityMW: 60,
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1582215286577-fb5f5cb3c82d?auto=format&fit=crop&q=80',
    description: 'Our newest and largest undertaking, set to significantly boost regional power supply.'
  }
];

export const team: TeamMember[] = [
  {
    id: 't1',
    name: 'Aarav Sharma',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
    bio: 'With over 20 years in the renewable energy sector, Aarav leads our vision for a sustainable future.'
  },
  {
    id: 't2',
    name: 'Sunita Patel',
    role: 'Head of Engineering',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
    bio: 'Sunita oversees the design and execution of all major hydropower infrastructure projects.'
  }
];

export const news: NewsItem[] = [
  {
    id: 'n1',
    title: 'Upper Gumu Project Reaches Milestone',
    date: '2026-08-15',
    excerpt: 'The tunneling phase for the Upper Gumu project has successfully been completed ahead of schedule.',
    content: 'Full article content would go here...'
  },
  {
    id: 'n2',
    title: 'Sustainability Award 2026',
    date: '2026-06-20',
    excerpt: 'Gumu Khola Hydropower recognized for excellence in environmental stewardship and community engagement.',
    content: 'Full article content would go here...'
  }
];
