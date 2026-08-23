import { Metadata } from "next";
import InfoPage from "@/components/ui/InfoPage";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Office Staffs",
  description: "Meet the people supporting Gumu Khola Hydropower every day.",
};

const departments = [
  { name: "Engineering & Operations", detail: "Keeping our plants safe, efficient, and ready to serve." },
  { name: "Finance & Administration", detail: "Supporting transparent, responsible business operations." },
  { name: "Environment & Community", detail: "Working with local partners to protect people and nature." },
];

export default function OfficeStaffsPage() {
  return (
    <InfoPage
      title="Office Staffs"
      subtitle="A collaborative team turning plans into dependable clean energy."
      imageSrc="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
    >
      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {departments.map((department) => (
          <div key={department.name} className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-3 text-xl font-bold text-primary">{department.name}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{department.detail}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {team.map((member) => (
          <div key={member.id} className="border-l-4 border-secondary pl-5">
            <h2 className="text-lg font-bold text-primary">{member.name}</h2>
            <p className="text-sm text-secondary">{member.role}</p>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
