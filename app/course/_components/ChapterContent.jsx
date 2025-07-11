"use client"

import React, { useContext, useState } from 'react';
import SelectedChapterIndexContext from '../../../context/SelectedChapterIndexContext';
import { CheckCircle, Loader2Icon, VideoIcon, X } from 'lucide-react';
import YouTube from 'react-youtube';
import { Button } from '../../../@/components/ui/button.jsx';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const ChapterContent = ({ courseInfo ,refreshData }) => {
  const {courseId}=useParams();
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = course?.courseContent;
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const topics=courseContent?.[selectedChapterIndex]?.courseData?.topics
  let completedChapters=enrollCourse?.completedChapters ?? [];

  const [loading,setLoading]=useState(false)

  const markChapterCompleted=async()=>{
    setLoading(true)
   if(!completedChapters.includes(selectedChapterIndex)){
    completedChapters.push(selectedChapterIndex);

    const result=await axios.put('/api/enroll-course',{
      courseId:courseId,
      completedChapters:completedChapters
    });

    console.log(result);
    refreshData();

    toast.success("Chapter Marked Completed")
    setLoading(false);
   }
  }

  const markChapterIncomplete=async()=>{
    setLoading(true)
    const completeChap=completedChapters.filter(item=>item!=selectedChapterIndex)
    const result=await axios.put('/api/enroll-course',{
      courseId:courseId,
      completedChapters:completeChap
    });

    console.log(result);
    refreshData();

    toast.success("Chapter Marked Incomplete")
    setLoading(false)
   }
   
  
  return (
    <div className='p-10'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-2xl'>
        {selectedChapterIndex + 1}) {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
      </h2>
      {!completedChapters.includes(selectedChapterIndex)?
      <Button onClick={()=>markChapterCompleted()}
       disabled={loading}
      > {loading?<Loader2Icon className='animate-spin'/> :<CheckCircle/>} Mark as Completed</Button>
      :
      <Button variant="outline" onClick={()=>markChapterIncomplete()} disabled={loading}>
        {loading?<Loader2Icon className='animate-spin'/> :<X/>}Mark Incomplete</Button>
      }
      </div>
      

      <h2 className='my-2 font-bold text-lg flex items-center gap-2'>
        <VideoIcon className='w-5 h-5 text-indigo-600' /> Related Videos
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        {videoData?.map((video, index) =>index<2 && (
          <div key={index} className='rounded-lg overflow-hidden shadow'>
            <YouTube videoId={video?.videoId} 
            className='w-full' />
            <p className='text-sm mt-1 text-center'>{video?.title}</p>
          </div>
        ))}
      </div>

      <div className='mt-7'>
        {topics?.map((topic,index)=>(
          <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'>
            <h2 className='font-bold text-2xl text-primary'>{index+1}.{topic?.topic}</h2>
            <div dangerouslySetInnerHTML={{ __html: topic?.content }}
            style={{
              lineHeight:'2.5'
            }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
