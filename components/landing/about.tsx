"use client";

import * as React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
type AboutProps = React.HTMLAttributes<HTMLDivElement>;

const developers = [
  {
    name: "Yash Bansod",
    role: "Full Stack Devoloper",
    imgSrc: "/images/yash.jpg",
  },
  {
    name: "Gopal Tayade",
    role: "Full Stack Devoloper",
    imgSrc: "/images/gopal.jpeg",
  },
  {
    name: "Chandan Werulkar",
    role: "Backend Developer",
    imgSrc: "/images/Chandan.jpg",
  },
  {
    name: "Chaitali Daware",
    role: "Frontend Devoloper",
    imgSrc: "/images/chaitali.jpg",
  },
  {
    name: "Aachal Chede",
    role: "Data Analyst",
    imgSrc: "/images/aachal.jpeg",
  },
];

const About: React.FC<AboutProps> = ({ className, ...props }) => {
  return (
    <section
      id="features"
      className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
          About developers
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Our team of developers is dedicated to continuously enhancing
          SynergyFlow&apos;s capabilities, implementing innovative solutions to
          optimize supply chain management processes and drive sustainable
          growth.
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-12 grid-cols-3 md:max-w-[52rem]">
        {developers.map((item) => (
          <div key={item.name} className="shadow-xl bg-slate-50 p-4">
            {/* <div className="relative mx-4 mt-4 h-48 w-48 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <img src={item.imgSrc} alt="profile-picture" />
            </div> */}
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <Image
                src={item.imgSrc}
                alt="Photo by Drew Beamer"
                fill
                className="rounded-md object-contain"
              />
            </AspectRatio>
            <div className="p-6 text-center">
              <h4 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {item.name}
              </h4>
              <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                {item.role}
              </p>
            </div>
            <div className="flex justify-center gap-7 p-6 pt-2">
              <a
                href="#linkedin"
                className="block text-[#0A66C2] bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#120fe6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>{" "}
              </a>
              <a
                href="#github"
                className="block text-[#010409] bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#120fe6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              <a
                href="#instagram"
                className="block text[#F902B8] bg-gradient-to-tr from-purple-600 to-purple-400 bg-clip-text font-sans text-xl font-normal leading-relaxed text-transparent antialiased"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F902B8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { About };
