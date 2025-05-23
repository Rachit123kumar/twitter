'use client';

import React from 'react';
import PostSHow from "../_components/postSHow";
import { useSession } from 'next-auth/react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';

export default function ShowPost() {
  const { status, data: sessionData } = useSession();

  // Fetch posts only when session is ready
  const { data: tweets, isLoading, isError, error } = useQuery({
    queryKey: ['posts', sessionData?.user?.email],
    queryFn: async () => {
      const res = await fetch(`/api/getPost?email=${sessionData?.user?.email}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: status === "authenticated", // Only fetch if logged in
  });

  // Show loader
  if (status === "loading" || isLoading) {
    return (
      <div className='h-[300px] w-full flex flex-col items-center justify-center'>
        <AiOutlineLoading className='size-5 text-white h-10 w-full animate-spin' />
        <div>Post Loading..</div>
      </div>
    );
  }

  // Error handling
  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className='text-white'>
      {tweets?.length > 0 ? (
        <PostSHow tweets={tweets} data={sessionData} />
      ) : (
        <div>No posts found.</div>
      )}
    </div>
  );
}
