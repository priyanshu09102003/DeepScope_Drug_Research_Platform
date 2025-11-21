import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface CTACardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  link: string;
}

const CTACard: React.FC<CTACardProps> = ({ title, subtitle, children, link }) => {
  return (
    <Link href={link}>
      <div className="rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-sm dark:border-[#181818] dark:bg-[#181818] cursor-pointer transition-all duration-200 hover:shadow-md hover:border-meta-2 dark:hover:border-meta-4 flex flex-col h-full">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>

        <div className="mt-4 flex-grow">
          <h4 className="text-title-md font-semibold text-black dark:text-white">
            {title}
          </h4>
          <span className="text-sm font-medium">{subtitle}</span>
        </div>
        
        <div className="mt-4 w-min rounded-full bg-[#64748b] p-2 transition-all duration-200 hover:bg-[#475569]">
          <span className="text-sm text-white">
            <ArrowRight size={20} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CTACard;