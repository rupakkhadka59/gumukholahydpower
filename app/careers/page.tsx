import { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import { CheckCircle2 } from "lucide-react";
import CareersListings from "@/components/careers/CareersListings";

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
          
          <CareersListings />
        </div>
        
      </div>
    </div>
  );
}
