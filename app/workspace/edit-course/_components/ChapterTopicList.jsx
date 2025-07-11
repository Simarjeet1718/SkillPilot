import { Gift } from "lucide-react";
import React from "react";

const ChapterTopicList = ({ course }) => {
  const courseLayout = course?.courseJson?.course;
  return (
    <div className="px-6 md:px-16 py-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-10">
        Chapters & Topics
      </h2>

      <div className="flex flex-col items-center gap-10">
        {courseLayout?.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="w-full max-w-2xl space-y-4">
            {/* Chapter Card */}
            <div className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              <h3 className="text-lg font-medium text-center tracking-wide">
                Chapter {chapterIndex + 1}
              </h3>
              <h2 className="text-2xl md:text-3xl font-semi-bold text-center mt-1">
                {chapter.chapterName}
              </h2>
              <div className="flex justify-between text-sm text-gray-100 mt-3 px-2">
                <span>⏱ Duration: {chapter?.duration}</span>
                <span>📚 Topics: {chapter?.topics?.length}</span>
              </div>
            </div>

            {/* Topics Timeline */}
            <div className="flex flex-col items-center">
              {chapter?.topics.map((topic, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* Vertical line */}
                  <div className="h-8 bg-gray-300 w-1" />

                  {/* Topic node */}
                  <div className="flex items-center gap-5">
                    <span
                      className={`text-sm md:text-base ${
                        index % 2 === 0 ? "" : "text-transparent"
                      }`}
                    >
                      {topic}
                    </span>

                    <div className="rounded-full bg-gray-300 text-gray-600 px-5 py-3 font-medium shadow-sm text-center">
                      {index + 1}
                    </div>

                    <span
                      className={`text-sm md:text-base ${
                        index % 2 !== 0 ? "" : "text-transparent"
                      }`}
                    >
                      {topic}
                    </span>
                  </div>

                  {/* Vertical line or Gift at end */}
                  {index !== chapter.topics.length - 1 ? (
                    <div className="h-8 bg-gray-300 w-1" />
                  ) : (
                    <div className="flex items-center gap-5 mt-3">
                      <Gift className="rounded-full bg-gray-300 h-14 w-14 text-gray-600 p-3 shadow" />
                    </div>
                  )}
                </div>
              ))}

              {chapter?.topics?.length === 1 && (
                <div className="h-8 bg-gray-300 w-1" />
              )}
            </div>
          </div>
        ))}

        {/* Finish Block */}
        <div className="p-5 rounded-xl shadow-lg bg-green-600 text-white w-full max-w-xs text-center mt-10">
          <h2 className="text-xl font-semibold">🎉 Finish</h2>
        </div>
      </div>
    </div>
  );
};

export default ChapterTopicList;
