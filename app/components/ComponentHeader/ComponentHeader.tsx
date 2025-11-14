"use client";

import Modal from "@/app/ui/modals/page";
import Link from "next/link";
import React from "react";

interface ComponentHeaderProps {
  pageName: string;
  containActionButton?: boolean;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  pageName,
  containActionButton,
  showBreadcrumb = false,
  breadcrumbItems = [],
}) => {
  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      {showBreadcrumb && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav>
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="font-medium text-black dark:text-white hover:text-primary">
                  Dashboard
                </Link>
              </li>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="text-black dark:text-white">/</li>
                  <li>
                    {item.href ? (
                      <Link href={item.href} className="font-medium text-black dark:text-white hover:text-primary">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-primary">{item.label}</span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          {pageName}
        </h2>

        {containActionButton && (
          <nav>
            <ol className="flex items-center gap-2">
              <li
                onClick={() => openModal("my_modal_1")}
                className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-center font-medium text-white"
              >
                Add Molecule
              </li>
            </ol>
          </nav>
        )}
      </div>

      <Modal
        id="my_modal_1"
        title="Add New Molecule"
        content={
          <>
            <form action="#">
              <div className="p-1">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      SMILS String
                    </label>
                    <input
                      type="text"
                      placeholder="Enter SMILS string"
                      className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Number of Molecules
                    </label>
                    <input
                      type="text"
                      placeholder="Enter number"
                      className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Minimum Similarity
                  </label>
                  <input
                    type="text"
                    placeholder="Enter minimum similarity"
                    className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Particles
                  </label>
                  <input
                    type="text"
                    placeholder="Enter particles"
                    className="w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Add molecule
                </button>
              </div>
            </form>
          </>
        }
        onCloseText="Close"
      />
    </div>
  );
};

export default ComponentHeader;