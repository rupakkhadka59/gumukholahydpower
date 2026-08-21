import { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join our team and help build a sustainable energy future.",
};

export default function CareersPage() {
  const benefits = [
    "Competitive salary and performance bonuses",
    "Comprehensive health, dental, and vision insurance",
    "Generous paid time off and flexible working hours",
    "Professional development and training budgets",
    "Retirement planning and company match",
    "Relocation assistance for specific roles",
  ];

  const jobs = [
    {
      id: "j1",
      title: "Senior Civil Engineer",
      type: "Full-Time",
      location: "On-Site (Upper Gumu Project)",
      department: "Engineering",
    },
    {
      id: "j2",
      title: "Environmental Health & Safety Manager",
      type: "Full-Time",
      location: "Regional Office",
      department: "Operations",
    },
    {
      id: "j3",
      title: "Hydrologist",
      type: "Full-Time",
      location: "Headquarters",
      department: "Research & Development",
    },
  ];

  return (
    <div>
      <Hero 
        title="Careers at Gumu Khola"
        subtitle="Shape the future of clean energy with us."
        imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Why Join Us?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We are a team of dedicated professionals who believe that our work directly impacts the well-being of our planet and future generations. At Gumu Khola Hydropower, you will be part of a culture that values innovation, safety, and environmental stewardship.
            </p>
            <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Benefits & Perks</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Open Positions</h2>
            
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-secondary">
                  <div>
                    <h3 className="font-bold text-lg text-primary dark:text-white">{job.title}</h3>
                    <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <span>{job.department}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{job.location}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Don't see a perfect fit? Send your resume to <a href="mailto:careers@gumukholahydro.com" className="text-secondary hover:underline">careers@gumukholahydro.com</a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
