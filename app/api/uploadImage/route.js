import { v2 as cloudinary } from "cloudinary"
import { NextResponse } from "next/server";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const config = {
    api: {
        bodyParser: false
    }
}

export async function POST(req) {

    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const folder = formData.get('path') || "upload";


        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder }, (error, result) => {
                if (error) return reject(error);
                resolve(result)
            }).end(buffer)
        })

       return NextResponse.json({
        message:'success',
       result
       })




    } catch (err) {
        return NextResponse.json({
            message: err.message || "server error",
            status: 400


        })
    }


}