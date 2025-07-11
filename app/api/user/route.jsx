
import { db } from "../../../config/db.js";
import { usersTable } from "../../../config/schema.js";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){

    const {email,name} = await req.json()

    // if user already exists
    const users=await db.select().from(usersTable)
    .where(eq(usersTable.email,email))

    // if not then insert 
    if(users?.length==0){
        const result= await db.insert(usersTable).values({
            name:name,
            email:email
        }).returning(usersTable)

        console.log(result)
        return NextResponse.json(result)
    }

    return NextResponse.json(users[0])
}

