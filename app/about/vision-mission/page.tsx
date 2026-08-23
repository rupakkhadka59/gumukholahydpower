import { Metadata } from "next";
import { Leaf, Target } from "lucide-react";
import InfoPage from "@/components/ui/InfoPage";

export const metadata: Metadata = {
  title: "Vision & Mission",
  description: "Discover the vision and mission guiding Gumu Khola Hydropower.",
};

export default function VisionMissionPage() {
  return (
    <InfoPage
      title="Vision & Mission"
      subtitle="A clear direction for a cleaner, more resilient energy future."
      imageSrc="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-8">
          <Target className="mb-5 h-10 w-10 text-secondary" />
          <h2 className="mb-4 text-2xl font-bold text-primary">Our Vision</h2>
          <p className="leading-relaxed text-muted-foreground">
            To be a trusted energy partner, powering inclusive development through reliable renewable electricity.
          </p>
        </section>
        <section className="rounded-2xl border border-border bg-card p-8">
          <Leaf className="mb-5 h-10 w-10 text-secondary" />
          <h2 className="mb-4 text-2xl font-bold text-primary">Our Mission</h2>
          <p className="leading-relaxed text-muted-foreground">
            To develop and operate efficient hydropower projects while protecting ecosystems and creating lasting local value.
          </p>
        </section>
      </div>
    </InfoPage>
  );
}
