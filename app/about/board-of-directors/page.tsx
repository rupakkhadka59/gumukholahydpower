import { Metadata } from "next";
import Image from "next/image";
import InfoPage from "@/components/ui/InfoPage";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Board of Directors",
  description: "Meet the leadership guiding Gumu Khola Hydropower.",
};

export default function BoardOfDirectorsPage() {
  return (
    <InfoPage
      title="Board of Directors"
      subtitle="Experienced leadership guiding sustainable growth and accountability."
      imageSrc="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {team.map((member) => (
          <article key={member.id} className="flex gap-6 rounded-2xl border border-border bg-card p-6">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
              <Image src={member.image} alt={member.name} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">{member.name}</h2>
              <p className="mb-3 font-medium text-secondary">{member.role}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </InfoPage>
  );
}
