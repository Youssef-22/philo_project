import React from 'react'

import Feed from '@components/Feed'
function Home() {
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>Discover & Share
        <br className='max-md:hidden'/>
        <span className='orange_gradient text-center'>Philosophy</span>
        </h1>
        <p className='desc text-center'>
            Philo is an open-source website to discover 
            the best philosophy quotes that inspires people,
            and share them with the world,get wiser us.
        </p>
    
        <Feed />
    
    </section>
  )
}

export default Home
