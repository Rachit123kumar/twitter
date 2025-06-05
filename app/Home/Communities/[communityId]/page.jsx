// app/app/[slug]/page.jsx
import Community from '../../../_models/communities';
import React from 'react'
import db from "../../../_features/utils/db"

export default async  function Page({ params }) {
    const url=await params
  const encoded = url.communityId; // assuming the file is in /app/app/[slug]/page.jsx
  const decoded = decodeURIComponent(encoded); // "Hello ji"

  await db.connectDb()

  const community =await Community.findOne({
    name:decoded
  }).populate('owner')
  
  console.log(community)

  return (
    <div className="text-white">
      <p>Name: {community?.name}</p>
      <p>Decoded: {decoded}</p>
    </div>
  );
}
