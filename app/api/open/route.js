

import { GoogleGenAI } from "@google/genai";


import { NextResponse } from "next/server";

export async function POST(req) {


    try {

        const { input } = await req.json()
        if (!input) {
            return NextResponse.json({ message: "give me input", status: 404 })
        }
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_SECRET });

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: input,
        });

        return NextResponse.json(response.text)


    }

    catch (err) {
        console.log(err)
        return NextResponse.json({
            message: err.message || "server error"
        })
    }



}