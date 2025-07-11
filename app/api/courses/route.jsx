import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../config/db.js";
import { courseTable } from "../../../config/schema.js";
import { desc, eq, ne, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");
  const user = await currentUser();

  if (courseId == 0) {
    const result = await db
      .select()
      .from(courseTable)
      .where(sql`${courseTable.courseContent}::jsonb !='{}' :: jsonb `);

    console.log(result);
    return NextResponse.json(result);
  }
  if (courseId) {
    const result = await db
      .select()
      .from(courseTable)
      .where(eq(courseTable.cid, courseId));

    console.log(result);
    return NextResponse.json(result[0]);
  } else {
    const result = await db
      .select()
      .from(courseTable)
      .where(eq(courseTable.userEmail, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(courseTable.id));

    console.log(result);
    return NextResponse.json(result);
  }
}
