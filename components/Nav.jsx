"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {useState,useEffect} from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'



function Nav() {

    const {data : session} = useSession();

    const [providers,setProviders]=useState(null);

    const [toggleDropdown,setToggleDropdown] = useState(false);

    useEffect(()=>{
        const setUpProviders = async ()=>{
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders(); 
    },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
        <Image 
        //src="/assets/images/marcus.png"
        src="/assets/images/universebg.png"
        alt="logo"
        width={60}
        height={60}
        className='object-contain rounded-full'
        />
        <p className='logo_text text-1xl md:text-2xl lg:text-3xl xl:text-4xl'>Philo</p>
        </Link>

        <div className='sm:flex hidden'>
        {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
                <Link href="/create" className='black_btn'>
                Create Post
                </Link>
                <button onClick={signOut} className='black_btn'>
                    Sign Out
                </button>
                <Link href='/profile'>
                    <Image src={session?.user.image}
                    width={40}
                    height={40}
                    className='rounded-full'
                    alt="Profile"
                    />
                   
                </Link>
             </div>   
        ):(
            <>
            {providers && 
            Object.values(providers).map((provider)=>(
                <button key={provider.name}
                onClick={()=>signIn(provider.id)}
                className='black_btn'
                >
                    Sign In
                </button>
            ))}
            </>
        )}
        </div>

        {/*  Mobile Navigation   */}
        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex'>
                     <Image src={session?.user.image}
                    width={40}
                    height={40}
                    className='rounded-full'
                    alt="Profile"
                    onClick={()=>setToggleDropdown((prev)=>!prev)}
                    />
                    {toggleDropdown && (
                        <div className='dropdown'>
                            <Link href='/profile'
                            className='dropdown_link'
                            onClick={()=>setToggleDropdown(false)}
                            >
                                My Profile

                            </Link>
                            <Link href='/create'
                            className='dropdown_link'
                            onClick={()=>setToggleDropdown(false)}
                            >
                                Create Quote

                            </Link>
                            <button onClick={()=>{setToggleDropdown(false)
                             signOut()           
                            }}
                            className='mt-5 w-full black_btn'
                            >
                                Sign Out
                            </button>
                        </div>    
                    )}
                 </div>   
            ):(
                <>
                {providers && 
                Object.values(providers).map((provider)=>(
                    <button key={provider.name}
                    onClick={()=>signIn(provider.id)}
                    className='black_btn'
                    >
                        Sign In
                    </button>
                ))}
                </>
            )}

        </div>

    </nav>
  )
}

export default Nav