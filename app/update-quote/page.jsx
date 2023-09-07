"use client";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter,useSearchParams } from "next/navigation";

import Form from "@components/Form";

function EditQuote() {
    const [submitting,setsubmitting] = useState(false);
    const [post,setPost]= useState({
        quote:'',
        tag:'',
    });
    const searchParams = useSearchParams();
    const quoteId = searchParams.get('id');

    // const {data:session} = useSession();
    const router = useRouter();
  

    useEffect(() => {
        console.log('get me the data here');
        const getQuoteDetails = async () => {
            try {
                const response = await fetch(`/api/quote/${quoteId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quote details');
                }
                const data = await response.json();
                setPost({
                    quote: data.quote,
                    tag: data.tag
                });
            } catch (error) {
                console.error(error);
            }
        };
    
        if (quoteId) {
            getQuoteDetails();
        }
    }, [quoteId]);


    const updateQuote = async (e)=>{
        e.preventDefault();
        setsubmitting(true); 

        if(!quoteId) return alert('Quote Id not found')

        try {
            const response = await fetch(`/api/quote/${quoteId}`,{
                method:'PATCH',
                body: JSON.stringify({
                    quote:post.quote,
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
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updateQuote}
    />
  )
}

export default EditQuote
