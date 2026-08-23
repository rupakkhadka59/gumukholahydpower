import { ReactNode } from "react";
import Hero from "@/components/ui/Hero";

interface InfoPageProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  children: ReactNode;
}

export default function InfoPage({ title, subtitle, imageSrc, children }: InfoPageProps) {
  return (
    <div>
      <Hero title={title} subtitle={subtitle} imageSrc={imageSrc} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {children}
      </div>
    </div>
  );
}
