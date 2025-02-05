"use client"

import Image from 'next/image'
import React, {useCallback} from 'react'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import useRegisterModal from '@/hooks/useRegisterModal'
import RegisterModal from '../modals/registerModal'


const Auth = () => {

  const registerModal = useRegisterModal();

  const onOpenRegisterModal = useCallback(() =>{

    registerModal.onOpen();

  },[registerModal]);

  return (
    <>
      <RegisterModal />
      {/* <LoginModal /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center h-screen">
        <Image
          src={"/images/x.svg"}
          alt="X"
          width={450}
          height={450}
          className="justify-self-center hidden md:block"
        />
        <div>
          <div className="block md:hidden">
            <Image src={"/images/x.svg"} alt="X" width={50} height={50} />
          </div>
          <h1 className="text-6xl font-bold">Happening now</h1>
          <div className="w-full md:w-[60%]">
            <h2 className="font-bold text-3xl mb-4">Join today.</h2>
            <div className="flex flex-col space-y-2">
              <Button onClick={() => signIn("google")}>
                <div className="flex gap-2 items-center justify-center">
                  Sign up with Google
                </div>
              </Button>

              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-700 w-1/2" />
                <p className="mx-4">or</p>
                <div className="h-px bg-gray-700 w-1/2" />
              </div>
              <Button onClick={onOpenRegisterModal}>Create account</Button>
              <div className="text-[10px] text-gray-400">
                By signing up, you agree to the{" "}
                <span className="text-sky-500">Terms of Service</span> and
                <span className="text-sky-500"> Privacy Policy</span>, including
                <span className="text-sky-500"> Cookie Use</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Auth
