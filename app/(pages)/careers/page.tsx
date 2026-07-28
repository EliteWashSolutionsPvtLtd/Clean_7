import { Metadata } from "next";
import { CareersClient } from "./careers-client";

export const metadata: Metadata = {
  title: "Careers | Clean7",
  description: "Join the Team at Clean7",
};

export default function CareersPage() {
  return (
    <main className="py-24">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Careers</h1>
          <h2 className="text-2xl text-muted-foreground mb-6">
            Join the Team at Clean7
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Clean7, we're building technology and services that make everyday
            life simpler. Whether it's laundry care, doorstep services, or the
            systems that power them, our goal is to deliver reliable experiences
            for our customers. We're always interested in connecting with people
            who share our focus on quality and problem-solving.
          </p>
        </div>

        <CareersClient />
      </div>
    </main>
  );
}
