import { boolean, integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const courseTable=pgTable("courses",{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  cid:varchar().notNull().unique(),
  name:varchar(),
  description:varchar(),
  noOfChapters:integer().notNull(),
  includeVideos:boolean().default(false),
  level:varchar().notNull(),
  category:varchar(),
  courseJson:json(),
  BannerImageUrl:varchar().default(''),
  courseContent:json().default({}),
  userEmail:varchar('userEmail').references(()=>usersTable.email).notNull()
  //email of the user who created the course
})

export const enrollCourseTable=pgTable("enrollCourse",{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  cid:varchar('cid').references(()=>courseTable.cid),
  userEmail:varchar('userEmail').references(()=>usersTable.email).notNull(),
  completedChapters:json()
})