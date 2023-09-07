'use client'
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

function profile() {
    const {data:session} = useSession();
    const [posts,setPosts] = useState([]);
    const router = useRouter();
    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if(session?.user.id) fetchPosts();
    },[])


    const handleEdit =(post)=>{
        router.push(`/update-quote?id=${post._id}`);
    }
    const handleDelete = async (post)=>{
        const hasCongirmed = confirm('Are you sure you want to delete this quote?');
        if(hasCongirmed){
            try {
                await fetch(`/api/quote/${post._id.toString()}`,{
                    method:'DELETE',
                })
                const filteredPots = posts.filter((p)=>p._id !== post._id);
                setPosts(filteredPots);
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <Profile 
    name="my"
    desc="welcome to your profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default profile