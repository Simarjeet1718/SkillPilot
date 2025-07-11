import { db } from '../../../config/db.js';
import { courseTable } from '../../../config/schema.js';
import { currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import { NextResponse } from 'next/server';
import axios from "axios"
const PROMPT=`Generate a Learning Course based on the following details.
Make sure to add:
Course Name
Course Description
Course Banner Image Prompt (see details below)
Chapter Name (in 3D format for Course Banner)
Topics under each chapter
Duration for each chapter

Course Banner Image Prompt:
Create a modern, flat-style 2D digital illustration representing the user topic.
Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools.
Add symbolic elements related to the user course like sticky notes, design components, and visual aids.
Use a vibrant color palette (blues, purples, oranges) with a clean, professional look.
The illustration should feel creative, tech-savvy, and educational — ideal for visualizing concepts in the user course.

Output Format (in JSON):
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}`

export  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
    const {courseId,...formData}=await req.json();
    const user=await currentUser();
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: PROMPT+JSON.stringify(formData),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  console.log(response.candidates[0].content.parts[0].text)

  const RawResp=response.candidates[0]?.content?.parts[0]?.text
  const RawJson=RawResp.replace('```json','').replace('```','')
  const JSONResp=JSON.parse(RawJson)

  const ImagePrompt=JSONResp.course.bannerImagePrompt;
  //Generate Image

  const bannerImageURL=await GenerateImage(ImagePrompt)

  //Save to Database

  const result=await db.insert(courseTable).values({
    ...formData,
    courseJson:JSONResp,
    userEmail:user?.primaryEmailAddress?.emailAddress,
    cid:courseId,
    BannerImageUrl:bannerImageURL
  })

  return NextResponse.json({courseId:courseId})
}


const  GenerateImage=async(imagePrompt)=>{
  const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: 'sdxl',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key':process.env?.AI_GURU_LAB_API, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
console.log(result.data.image) //Output Result: Base 64 Image
return result.data.image
}
