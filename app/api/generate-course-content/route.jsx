import { NextResponse } from "next/server";
import {ai} from "../../../lib/aiClient.js"
import axios from "axios";
import { db } from "../../../config/db";
import { courseTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

const PROMPT = `
You are an expert course builder AI.

Generate topic-wise HTML content for each topic of the chapter below.

For each topic, return:
- "topic": the topic name
- "content": the HTML content as a string (escaped properly)

📌 Output Format: A valid JSON array

❌ Do NOT include "3D:", "Chapter", or numbering like "1.", "2." etc. in the topic or chapter names.
✅ Just provide clean and natural names.
Example:
{
  "chapterName": "Introduction to HTML",
  "topics": [
    {
      "topic": "What is HTML?",
      "content": "<p>HTML stands for Hypertext Markup Language...</p>"
    },
    {
      "topic": "Basic Tags",
      "content": "<ul><li>&lt;h1&gt;</li><li>&lt;p&gt;</li></ul>"
    }
  ]
}

Return ONLY raw JSON. Do NOT use markdown code blocks like \`\`\`.
Chapter:
`;

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promises = courseJson?.chapters?.map(async (chapter) => {
    const config = {
      responseMimeType: "text/plain",
    };
    const model = "gemini-2.0-flash";
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT+JSON.stringify(chapter),
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    console.log(response.candidates[0].content.parts[0].text);

    const RawResp=response.candidates[0]?.content?.parts[0]?.text
    const RawJson=RawResp.replace('```json','').replace('```','')
    //agar .trim use karte after 
    //     const RawJson=RawResp.replace('```json','').replace('```','').trim()
    //tab purana prompt bhi kaam karta
    const JSONResp=JSON.parse(RawJson)

    // Get Youtube video
    const youtubeData=await GetYoutubeVideo(chapter?.chapterName)
    console.log({
        youtubeVideo:youtubeData,
        courseData:JSONResp
    })
    return {
        youtubeVideo:youtubeData,
        courseData:JSONResp
    }
  });

  const CourseContent=await Promise.all(promises)

  //save to DB
  const dbResp=await db.update(courseTable).set({
    courseContent:CourseContent
  }).where(eq(courseTable.cid,courseId));

  return NextResponse.json({
    courseName:courseTitle,
    CourseContent:CourseContent
  })
}

const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search'
const GetYoutubeVideo=async (topic)=>{

    const params={
        part:'snippet',
        q:topic,
        maxResult:5,
        type:'video',
        key:process.env.YOUTUBE_API_KEY//Youtube api key
    }

    const resp=await axios.get(YOUTUBE_BASE_URL,{params})
    const youtubeVideoListResp=resp.data.items;
    const youtubeVideoList=[];
    youtubeVideoListResp.forEach(item=> {
        const data={
            videoId:item.id?.videoId,
            title:item?.snippet?.title
        }
        youtubeVideoList.push(data)
    });
    console.log("youtubeVideoList",youtubeVideoList)
    return youtubeVideoList
}
