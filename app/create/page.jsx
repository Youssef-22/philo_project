"use client";
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

function CreateQuote() {
    const [submitting,setsubmitting] = useState(false);
    const [post,setPost]= useState({
        quote:'',
        tag:'',
    });

    const {data:session} = useSession();
    const router = useRouter();

    const createQuote = async (e)=>{
        e.preventDefault();
        setsubmitting(true); 

        try {
            const response = await fetch('/api/quote/new',{
                method:'POST',
                body: JSON.stringify({
                    quote:post.quote,
                    userId:session?.user.id,
                    tag:post.tag
                })
            })
            if(response.ok){
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }finally{
            setsubmitting(false);
        }

    }
  return (
    <Form 
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createQuote}
    />
  )
}

export default CreateQuote
