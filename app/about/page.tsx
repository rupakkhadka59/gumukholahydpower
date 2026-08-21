import { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/ui/Hero";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the history, mission, and team behind Gumu Khola Hydropower.",
};

export default function AboutPage() {
  return (
    <div>
      <Hero 
        title="About Gumu Khola Hydropower"
        subtitle="Driven by innovation, dedicated to sustainability."
        imageSrc="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At Gumu Khola Hydropower, our mission is to accelerate the transition to clean energy by developing, constructing, and operating world-class run-of-river hydroelectric facilities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We strive to balance energy generation with environmental conservation, ensuring that our projects benefit both local communities and the broader ecosystem.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" 
              alt="Hydropower facility" 
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-primary mb-10 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-md">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary dark:text-white">{member.name}</h3>
                <p className="text-secondary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
