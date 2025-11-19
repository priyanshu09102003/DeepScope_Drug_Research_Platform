"use client";
import ComponentHeader from "@/app/components/ComponentHeader/ComponentHeader";
import Image from "next/image";

import { CameraIcon } from "lucide-react";
import { useUser } from "../context/UserContext";
import DefaultLayout from "../components/Layout/DefaultLayout";

const Profile = () => {
  const user = useUser();

  console.log(user);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <ComponentHeader 
          pageName="Profile" 
          containActionButton={false}
          showBreadcrumb={true}
          breadcrumbItems={[
            { label: "Profile" }
          ]}
        />

        <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
          {user.coverPhoto ? (
            <div className="relative z-20 h-35 md:h-65">
              <Image
                src={user.coverPhoto}
                alt=""
                className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                width={970}
                height={260}
                priority
              />
            </div>
          ) : (
            <div className="relative z-20 h-35 md:h-65">
              <Image
                src="/images/user/bg-img.jpg"
                alt=""
                className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                width={970}
                height={260}
                priority
              />
            </div>
          )}
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative h-full w-full drop-shadow-2">
                <Image
                  src={user.photo}
                  width={160}
                  height={160}
                  className="h-full w-full rounded-full object-cover"
                  alt=""
                  priority
                />
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <CameraIcon size={22} />
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {user.firstName} {user.lastName}
              </h3>
              <p className="font-medium">Researcher</p>

              <div className="mx-auto mt-6 max-w-180">
                <h4 className="mb-3 font-semibold text-black dark:text-white">
                  About Me
                </h4>
                <p className="text-sm leading-relaxed">{user.userBio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;