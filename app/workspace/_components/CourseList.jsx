"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../../../@/components/ui/button";
import AddNewCourseDialog from "./AddNewCourseDialog.jsx";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard.jsx";


const CourseList = () => {
  const [CourseList, setCourseList] = useState([]);
  const user=useUser();
  useEffect(()=>{
    user && GetCourseList()
  },[user])
  const GetCourseList=async()=>{
    const result=await axios.get('/api/courses');
    console.log(result.data)
    setCourseList(result.data)
  }
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl ">Course List</h2>

      {CourseList?.length == 0 ? (
        <div className="flex flex-col p-7 items-center justify-center border rounded-xl mt-2 bg-secondary">
          <Image
            src={"/online-education.png"}
            alt="edu"
            width={80}
            height={80}
          />
          <h2 className="text-xl font-medium text-gray-800 my-2">
            It looks like you haven’t created any courses yet. Let’s get
            started!
          </h2>

          <AddNewCourseDialog>
            <Button width={80} height={80}>+ Create Your First Course</Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
          {CourseList.map((course,index)=>(
            <CourseCard course={course} key={index}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
