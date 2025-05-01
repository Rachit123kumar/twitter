import { NextResponse } from "next/server";
import bodyParser from 'body-parser'
import fileUpload from "express-fileupload"

export const config={
  api:{
    bodyParser:false
  }
}



export async function POST(req){

  const files=req.files;
  
console.log(files)

  return NextResponse.json({
  message:"I am archit ",
  files
  })
}