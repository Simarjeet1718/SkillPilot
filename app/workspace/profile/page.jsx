"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "../../../@/components/ui/button";
import Link from "next/link";
import axios from "axios";

export default function Profile() {
  const { user } = useUser();
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      const res = await axios.get("/api/user/overview");
      setOverview(res.data);
    };
    fetchOverview();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user?.imageUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="text-xl font-semibold">{user?.fullName}</p>
          <p className="text-gray-600">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500">Courses Enrolled</p>
          <p className="text-2xl font-bold">{overview?.totalEnrolled ?? 0}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-sm text-gray-500">Courses Completed</p>
          <p className="text-2xl font-bold">{overview?.totalCompleted ?? 0}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recently Accessed Courses</h2>
        {overview?.recentCourses?.length > 0 ? (
          <ul className="list-disc ml-5 text-gray-700">
            {overview.recentCourses.map((course, idx) => (
              <li key={idx}>
                {course.title ?? course.cid} {/* fallback in case title missing */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent courses.</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="mt-8 flex gap-4 flex-wrap">
        <Link href="/workspace/explore">
          <Button>Explore Courses</Button>
        </Link>
        <Link href="/workspace">
          <Button variant="outline">Dashboard</Button>
        </Link>
        <SignOutButton>
          <Button variant="destructive">Logout</Button>
        </SignOutButton>
      </div>
    </div>
  );
}
