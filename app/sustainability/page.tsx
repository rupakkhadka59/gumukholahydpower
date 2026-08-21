import { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import { TreePine, Fish, Sprout, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Our commitment to environmental stewardship and local communities.",
};

export default function SustainabilityPage() {
  return (
    <div>
      <Hero 
        title="Our Commitment to Sustainability"
        subtitle="Generating clean energy while protecting our natural resources."
        imageSrc="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Environmental Stewardship</h2>
            <p className="text-muted-foreground mb-4">
              We understand that our operations are intertwined with the natural environment. That's why every project undergoes rigorous environmental impact assessments before ground is broken.
            </p>
            <p className="text-muted-foreground">
              By utilizing run-of-river technology, we avoid the need for large reservoirs, which significantly reduces our carbon footprint and minimizes disruption to local ecosystems and communities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm text-center">
              <TreePine className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-bold text-primary dark:text-white mb-1">Reforestation</h3>
              <p className="text-sm text-muted-foreground">Planting 2 trees for every 1 removed</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm text-center mt-6">
              <Fish className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-bold text-primary dark:text-white mb-1">Aquatic Life</h3>
              <p className="text-sm text-muted-foreground">Advanced fish ladders & screening</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm text-center -mt-6">
              <Wind className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-bold text-primary dark:text-white mb-1">Carbon Offset</h3>
              <p className="text-sm text-muted-foreground">Over 350k tons of CO2 offset annually</p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm text-center">
              <Sprout className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-bold text-primary dark:text-white mb-1">Local Growth</h3>
              <p className="text-sm text-muted-foreground">Supporting local agriculture</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary text-white rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Community Initiatives</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-secondary-light">Education</h3>
              <p className="text-slate-300">We fund scholarships for local students and provide infrastructure for rural schools in our project areas.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-secondary-light">Healthcare</h3>
              <p className="text-slate-300">Partnering with local governments to establish and equip health posts, ensuring better access to medical care.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-secondary-light">Infrastructure</h3>
              <p className="text-slate-300">Upgrading local roads and bridges, which improves connectivity and boosts local economic activities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
