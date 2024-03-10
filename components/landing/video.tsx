"use client";

import * as React from "react";
import { Icons } from "../icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Video = () => {
  return (
    <section
      id="features"
      className="container space-y-16 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-sans text-2xl leading-[1.1] sm:text-2xl md:text-5xl font-extrabold">
          We are ready to help
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          We are committed to your success. Contact us for any assistance;
          we&apos;re ready to help!
        </p>
      </div>
      <div className="mx-auto flex justify-center md:max-w-[64rem] relative">
        <div className="overflow-hidden">
          <Dialog>
            <DialogTrigger>
              <img
                src="/images/video/video.jpg"
                alt="demo video image"
                className="max-w-4xl rounded-md hover:scale-105 transition duration-500"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-2">
                  Learn about supply chain?
                </DialogTitle>
                <video controls={true}>
                  <source
                    src="https://youtu.be/Lpp9bHtPAN0?si=45IWvcGT7-Lj0fAl"
                    type="video/mp4"
                  />
                </video>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
