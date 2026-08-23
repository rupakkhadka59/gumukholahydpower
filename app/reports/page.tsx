import { Metadata } from "next";
import InfoPage from "@/components/ui/InfoPage";
import ReportsList from "@/components/reports/ReportsList";

export const metadata: Metadata = {
  title: "Reports",
  description: "Read reports and publications from Gumu Khola Hydropower.",
};

export default function ReportsPage() {
  return (
    <InfoPage
      title="Reports"
      subtitle="Publications that share our progress, performance, and commitments."
      imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
    >
      <ReportsList />
    </InfoPage>
  );
}
