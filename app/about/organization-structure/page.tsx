import { Metadata } from "next";
import { Building2, Users, Wrench } from "lucide-react";
import InfoPage from "@/components/ui/InfoPage";

export const metadata: Metadata = {
  title: "Organization Structure",
  description: "Explore the organizational structure of Gumu Khola Hydropower.",
};

const levels = [
  { title: "Board of Directors", detail: "Governance, oversight, and strategic direction.", icon: Building2 },
  { title: "Executive Management", detail: "Company leadership, planning, and performance.", icon: Users },
  { title: "Project & Support Teams", detail: "Engineering, operations, finance, and community delivery.", icon: Wrench },
];

export default function OrganizationStructurePage() {
  return (
    <InfoPage
      title="Organization Structure"
      subtitle="Clear responsibilities create better decisions and stronger delivery."
      imageSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
    >
      <div className="mx-auto max-w-3xl space-y-4">
        {levels.map(({ title, detail, icon: Icon }, index) => (
          <div key={title} className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-secondary">Level {index + 1}</p>
              <h2 className="text-xl font-bold text-primary">{title}</h2>
              <p className="text-muted-foreground">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
