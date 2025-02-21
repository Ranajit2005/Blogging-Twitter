import React, { useCallback, useState } from 'react'
import Modal from '../ui/modal'
import useLoginModal from '@/hooks/useLoginModal'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const LoginModal = () => {

    const loginModal = useLoginModal();
    const registerModel = useRegisterModal();

    const [error,setError] = useState("");

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

      const { isSubmitting } = form.formState;

      const onSubmit = async (values: z.infer<typeof loginSchema>) => {

        try {

          const { data } = await axios .post("api/auth/login", values);
    
          if(data.success){
            signIn("credentials",values); 
            loginModal.onClose();
          }
          
    
        } catch (error : any) {
    
          if(error.response.data.error){
            setError(error.response.data.error) 
            console.log(error)
          }else{
            setError("Something went wrong")
            console.log(error)
          }
        }

        loginModal.onClose();
      }

      const onToggle = useCallback(()=>{
        registerModel.onOpen();
        loginModal.onClose();
      },[registerModel,loginModal])

      const bodyContent = (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      )

      const footer = (
        <div className="text-neutral-400 text-center mb-4">
          <p>
            First time using X?
            <span
              className="text-white cursor-pointer hover:underline"
              onClick={onToggle}
            >
              {" "}
              Create an account
            </span>
          </p>
        </div>
      );

    return (
        
        <Modal
            body={bodyContent}
            footer={footer}
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
        />
  )
}

export default LoginModal
