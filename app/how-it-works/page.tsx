import { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import { Droplets, Zap, ArrowDown, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn the science and engineering behind run-of-river hydropower generation.",
};

export default function HowItWorksPage() {
  return (
    <div>
      <Hero 
        title="How Hydropower Works"
        subtitle="The elegant simplicity of converting flowing water into clean electricity."
        imageSrc="https://images.unsplash.com/photo-1582215286577-fb5f5cb3c82d?auto=format&fit=crop&q=80"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">The Run-of-River Process</h2>
          <p className="text-lg text-muted-foreground">
            Unlike traditional dams that create large reservoirs, our run-of-river projects divert a portion of the river's flow through a penstock (pipe) to spin a turbine, before returning the water back to the river downstream. This minimizes environmental impact while generating reliable power.
          </p>
        </div>
        
        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">1. Intake</h3>
              <p className="text-muted-foreground">A small weir diverts a portion of the river's flow into an intake structure. Fish screens prevent aquatic life from entering the system.</p>
            </div>
          </div>
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              <ArrowDown className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">2. Penstock</h3>
              <p className="text-muted-foreground">The water travels down a steep pipe called a penstock. The drop in elevation (the "head") builds immense water pressure.</p>
            </div>
          </div>
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary-light text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              <Activity className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">3. Turbine & Generator</h3>
              <p className="text-muted-foreground">The high-pressure water spins a turbine, which is connected to a generator. The spinning generator converts the mechanical energy into electricity.</p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary-light text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
              <Zap className="w-5 h-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">4. Transmission & Return</h3>
              <p className="text-muted-foreground">The electricity is sent to the grid via transmission lines. The water flows out of the powerhouse (tailrace) and safely rejoins the river.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
