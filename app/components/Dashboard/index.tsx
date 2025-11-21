"use client";
import dynamic from "next/dynamic";
import React from "react";

import { AtomIcon, MessageCircle, Network, SearchIcon } from "lucide-react";
import CTACard from "./Components/CTACard";

const DashboardCardMap = dynamic(
  () => import("@/app/components/Dashboard/Components/DashboardCardMap"),
  {
    ssr: false,
  },
);

const DashboardCardChat = dynamic(
  () => import("@/app/components/Dashboard/Components/DashboardCardChat"),
  {
    ssr: false,
  },
);

const Index: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CTACard 
          subtitle="Access extensive compound libraries with verified structures and bioactivity data" 
          title="Molecule Bank"
          link="/molecule-bank"
        >
          <AtomIcon />
        </CTACard>
        <CTACard
          subtitle="AI-powered de novo modelling of molecules with optimized ADMET properties and synthesizability"
          title="Molecular Modelling"
          link="/model"
        >
          <Network />
        </CTACard>
        <CTACard
          subtitle="Explore chemical space with similarity search, substructure matching, and property filters"
          title="Search Compounds"
          link="/research"
        >
          <SearchIcon />
        </CTACard>
        <CTACard
          subtitle="Share datasets, co-design molecules, and accelerate discoveries with global teams"
          title="Collaborative Research"
          link="/message"
        >
          <MessageCircle />
        </CTACard>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 xl:grid-cols-12 2xl:mt-7.5 2xl:gap-7.5">
        <DashboardCardChat />
        <DashboardCardMap />
      </div>
    </>
  );
};

export default Index;