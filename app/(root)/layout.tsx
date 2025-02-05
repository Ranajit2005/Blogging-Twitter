import Auth from '@/components/common/Auth';
import Sidebar from '@/components/common/Sidebar';
import { getAuthOptions } from '@/lib/authOptions';
import React from 'react'


interface Props{
  children: React.ReactNode;
}

const Homelayout = async ({children} : Props) => {

  const session : any = await getAuthOptions();

  if(!session){
    return (
      <div className='container h-screen mx-auto max-w-7xl'>
        <Auth />
      </div>
    );
  }

  return (
    <div>

      <div>
        <Sidebar user={JSON?.parse(JSON.stringify(session?.currentUser))}/>
        {/* sidebar */}
      </div>
      {children}
    </div>
  )
}

export default Homelayout
