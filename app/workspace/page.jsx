import React from 'react'
import WelcomeBanner from "./_components/WelcomeBanner.jsx"
import CourseList from "./_components/CourseList.jsx"
import EnrollCourseList from "./_components/EnrollCourseList.jsx"
function Workspace() {
  return (
    <div>
      <WelcomeBanner/>
      <EnrollCourseList/>
      <CourseList/>
    </div>
  )
}

export default Workspace
