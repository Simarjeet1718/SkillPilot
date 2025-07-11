"use client";

import { Button } from "../@/components/ui/button.jsx";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-white via-indigo-50 to-indigo-100">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-extrabold text-indigo-700">SkillPilot</h1>
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </SignedOut>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between flex-1 px-6 md:px-16 py-12 gap-10">
        {/* Text Section */}
        <div className="flex flex-col text-center md:text-left items-center md:items-start max-w-xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            Unlock Smarter Learning with <br />
            <span className="text-indigo-600">AI-Generated Courses</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            SkillPilot is an AI-powered learning platform where you can
            instantly generate personalized courses, track your progress, and
            take control of your educational growth — all in one
            place.
          </p>
          <div className="mt-6 flex gap-4 flex-wrap justify-center md:justify-start">
            <Link href="/workspace/explore">
              <Button className="text-base px-6 py-3">Explore Courses</Button>
            </Link>
            <Link href="/workspace">
              <Button variant="outline" className="text-base px-6 py-3">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={"/heroimage.jpg"}
            alt="Mental wellness illustration"
            width={400}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full h-auto"
            priority
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500 bg-white shadow-inner">
        © {new Date().getFullYear()} SkillPilot. All rights reserved.
      </footer>
    </div>
  );
}
