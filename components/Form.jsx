import React from 'react'
import Link from 'next/link'

function Form({ 
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='orange_gradient'>{type} Post</span>
        </h1>
        <p className='desc text-left max-w-md'>
          {type} and share a quote of a philosopher 
          or put your own and show the world how 
          creative you are and let your imagination take controll 
        </p>
        <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism' 
        >
          <label>
            <span className='font-satoshi font semibold text-base text-white'>
              Your Quote</span>
          </label>
          <textarea
          value={post.quote}
          onChange={(e)=>setPost({...post,quote:e.target.value})}
          placeholder='write your quote here'
          required
          className='form_textarea'
          />

          <label>
            <span className='font-satoshi font semibold text-base text-white'>
              Tag {' '}
              <span className='font-normal'>(#stoicism,#manga,#selfdevelopement)</span>
              </span>
          </label>
          <input
          value={post.tag}
          onChange={(e)=>setPost({...post,tag:e.target.value})}
          placeholder='#tag'
          required
          className='form_input'
          />

          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href="/" className='text-white yeaxt-sm '>
            cancel
            </Link>

            <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            >
              {submitting ? `${type}...` : type}

            </button>

          </div>

        </form>
    </section>
  )
}

export default Form