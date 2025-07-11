"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseInfo from "../_components/CourseInfo.jsx"
import ChapterTopicList from "../_components/ChapterTopicList.jsx"


const EditCourse = ({viewCourse=false}) => {
  const {courseId}=useParams();
  const [loading,setLoading]=useState(false)
  const [course,setCourse]=useState()
  console.log(courseId)

  useEffect(()=>{
    GetCourseInfo();
  },[])

  const GetCourseInfo=async()=>{
    setLoading(true)
    const result=await axios.get('/api/courses?courseId='+courseId)
    console.log(result.data)
    setLoading(false)
    setCourse(result.data)
  }
  return (
    <div>
      <CourseInfo course={course} viewCourse={viewCourse}/>
      <ChapterTopicList course={course} />
    </div>
  )
}

export default EditCourse
