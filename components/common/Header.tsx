import { ArrowBigLeft } from 'lucide-react'
import React from 'react'

interface Propes {title : string, isBack?:boolean}

const Header = ({title, isBack}:Propes) => {
  return (
    <div className='border-b-[1px] border-neutral-800 w-full p-5'>
      <div className='flex items-center gap-2'>
        {isBack && (
            <ArrowBigLeft 
            color='white' 
            size={20} 
            className='cursor-pointer hover:opacity-70 transition' />
        )}

        <h1 className='text-white text-xl font-semibold'>
          {title}
        </h1>

      </div>
    </div>
  )
}

export default Header
