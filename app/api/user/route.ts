import { connectionDatabase } from "@/lib/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    try {

        await connectionDatabase();
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit");

        const user = await User.find({})
        .select("name username _id email profilePhoto")
        .limit(Number(limit))
        .sort({ createAt: -1 });

        return NextResponse.json(user)
        
    } catch (error) {

        const result = error as Error;
        return NextResponse.json({
            error: result.message
        }, { status: 400 })

    }
}
