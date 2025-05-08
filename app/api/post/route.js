import db from "../../_features/utils/db";
import { NextResponse } from "next/server";
import User from "../../_models/user";
import Tweet from "../../_models/tweet"

export async function POST(req) {

  try {

    db.connectDb();


    const body = await req.json();

    //  check type if type is POLL
    const { type: kind } = body
    if (kind == 'poll') {




      const { expiresIn, email, type, option, question } = body
      console.log(body)
      // option: [ 'How are you', 'I am ', 'I am good ' ]
      const today = new Date();
      const expires = new Date(today.getTime() + expiresIn.days * 24 * 60 * 60 * 1000 + expiresIn.hour * 60 * 60 * 1000 + expiresIn.min * 60 * 1000)
      console.log("expiresin", expires.toString())

      const person = await User.find({
        email: email
      })
      console.log(person, "person")


      // create tweet 
      const post = await Tweet.create({
        author: person[0]._id,
        kind: 'POLL',
        poll: {
          Question: question,
          options: option,
          expiresAt: expires

        }



      })
      console.log(post)

      return NextResponse.json(post);
    } else if (kind === 'CONTENT') {
      const {email, media=[],text}=body
console.log(email,media,text);

        const person=await User.find({
          email:email
        })

        if(media){

          const newTweet=await Tweet.create({
            author: person[0]._id,
            kind: 'CONTENT',
            media,
            content:text
            
          })
          return NextResponse.json(newTweet)
        }
        const newTweet=await Tweet.create({
          author: person[0]._id,
          kind: 'CONTENT',
          
          content:text
          
        })
        
        return NextResponse.json(newTweet)

      

    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error occured.." })
  }
}
