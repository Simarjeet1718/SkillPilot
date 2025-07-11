import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../../config/db.js";
import { enrollCourseTable, courseTable } from "../../../../config/schema.js";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user?.primaryEmailAddress?.emailAddress;

    const enrolledCourses = await db
      .select({
        cid: enrollCourseTable.cid,
        completedChapters: enrollCourseTable.completedChapters,
        title: courseTable.name,
      })
      .from(enrollCourseTable)
      .leftJoin(courseTable, eq(enrollCourseTable.cid, courseTable.cid))
      .where(eq(enrollCourseTable.userEmail, email));

    const totalEnrolled = enrolledCourses.length;
    const totalCompleted = enrolledCourses.filter(
      (course) =>
        Array.isArray(course.completedChapters) &&
        course.completedChapters.length > 0
    ).length;

    return Response.json({
      totalEnrolled,
      totalCompleted,
      recentCourses: enrolledCourses.slice(-3).reverse(), // latest 3
    });
  } catch (error) {
    console.error("API Error in /api/user/overview:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
