import { connectionDatabase } from "@/lib/connection";
import Post from "@/models/post.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

// export async function PUT(req: Request,route:{params:{userId:string}}) {

//     try {

//         await connectionDatabase();
        
//         const body = await req.json();
//         const { userId } = route.params;
        

//         const user = await User.find({
//             _id: { $ne: userId }
//         })
//         .select("name username _id email profilePhoto")
//         .limit(Number(limit))
//         .sort({ createAt: -1 });

//         // console.log("use is : ",user);
        
//         return NextResponse.json(user)
        
//     } catch (error) {

//         const result = error as Error;
//         return NextResponse.json({
//             error: result.message
//         }, { status: 400 })

//     }
// }


export async function GET(req: Request,route:{params:{userId:string}}) {

    try {

        await connectionDatabase();

        const { userId } = route.params;

        const user = await User.findById(userId)

        const posts = await Post.find({
            user:user?._id
        })
        
        return NextResponse.json({ 
            user,
            posts,
            success:true
        }); 
        
    } catch (error) {

        const result = error as Error;
        return NextResponse.json({
            error: result.message
        }, { status: 400 })

    }
}
