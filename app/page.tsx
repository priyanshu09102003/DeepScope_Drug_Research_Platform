import Index from "./components/Dashboard";
import DefaultLayout from "./components/Layout/DefaultLayout";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "DeepScope - A leading Genetic and Drug Research Platform",
  description: "This a genetic and drug research platform for researchers and geneticists with inbuilt Research Search Engine"
}

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Index/>
      </DefaultLayout>
    </>
  );
}