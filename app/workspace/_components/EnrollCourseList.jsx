"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from "../_components/EnrollCourseCard.jsx"
const EnrollCourseList = () => {

    const [enrolledCourseList,setEnrolledCourseList]=useState([])

    useEffect(()=>{
        getEnrolledCourses()
    },[])

    const getEnrolledCourses=async ()=>{

        const result=await axios.get('/api/enroll-course');
        console.log("Enrolled Courses",result.data)
        setEnrolledCourseList(result.data)
    }

  return enrolledCourseList?.length>0 && (
    <div className='mt-3'>
      <h2 className='font-bold text-xl'>Continue Learning</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
      {enrolledCourseList.map((course,index)=>(
        <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse}  key={index}/>
      ))}
      </div>
    </div>
  )
}

export default EnrollCourseList
