import { Progress } from "../../../@/components/ui/progress.jsx";
import Image from "next/image";
import React from "react";
import { Button } from "../../../@/components/ui/button.jsx";
import { PlayCircle } from "lucide-react";
import Link from "next/link.js";

const EnrollCourseCard = ({ course, enrollCourse }) => {
  const courseJson = course?.courseJson.course;

  const CalculateProgress = () => {
    const completed = enrollCourse?.completedChapters?.length ?? 0;
    const total = course?.courseContent?.length ?? 1; // avoid division by 0
    return (completed / total) * 100;
  };

  return (
    <div className="shadow rounded-2xl">
      <Image
        src={course?.BannerImageUrl}
        alt={course?.name}
        width={400}
        height={400}
        className="w-full aspect-video rounded-t-xl object-cover"
      />

      <div className="p-3 flex flex-col gap-5">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-400 text-sm">
          {courseJson?.description}
        </p>
        <div className="">
          <h2 className="flex justify-between text-sm text-primary">
            Progress<span>{CalculateProgress()}%</span>
          </h2>
          <Progress value={CalculateProgress()} />

          <Link href={"/workspace/view-course/" + course?.cid}>
            <Button className={"w-full mt-3"}>
              <PlayCircle />
              Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseCard;
