import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
export async function POST(req) {


    const body = await req.json();
    try {
        const { request } = body



        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_SECRET });


        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: request }] }],
        });

        console.log(response.text);

        return NextResponse.json(response.text)
    } catch (err) {

        console.log(err)
        return NextResponse.json({
            status: 404,
            server: "server error"
        })



    }


}