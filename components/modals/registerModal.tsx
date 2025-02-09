import useRegisterModal from "@/hooks/useRegisterModal";
import { registerStep1Schema, registerStep2Schema } from "@/lib/validation";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from  "axios";
import { signIn } from "next-auth/react";

interface dataProps {
  name: string;
  email: string;
}

const RegisterModal = () => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<dataProps>({ name: "", email: "" });

  const registerModel = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(()=>{
    registerModel.onClose();
    loginModal.onOpen();
  },[registerModel,loginModal])

  const bodyContent =
    step == 1 ? (
      <RegisterStep1 setData={setData} setStep={setStep} />
    ) : (
      <RegisterStep2 data={data} />
    );

    const footer = (
      <div className="text-neutral-400 text-center mb-4">
        <p>
          Already have an account?{" "}
          <span className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
          >
            Sign in
          </span>

        </p>
      </div>
    )

  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={registerModel.isOpen}
      onClose={registerModel.onClose}
      step={step}
      totalSteps={2}
    />
  );
};

export default RegisterModal;

function RegisterStep1({
  setData,
  setStep,
}: {
  setData: Dispatch<SetStateAction<{ name: string; email: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof registerStep1Schema>>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof registerStep1Schema>) => {

    try {

      const { data } = await axios.post("http://localhost:3000/api/auth/register?step=1", values);

      if(data.success){
        setData(values);
        setStep(2);
      }
      

    } catch (error : any) {

      if(error.response.data.error){
        setError(error.response.data.error) 
        console.log(error)
      }else{
        // setError("Something went wrong")
        console.log(error)
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-10">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button disabled={isSubmitting} type="submit" className="w-full">
          Next
        </Button>
      </form>
    </Form>
  );
}


function RegisterStep2({ data}: any) {

    const [error, setError] = useState("");
    const registerModel = useRegisterModal()
  
    const form = useForm<z.infer<typeof registerStep2Schema>>({
      resolver: zodResolver(registerStep2Schema),
      defaultValues: {
        password: "",
        username: "",
      },
    });
  
    const { isSubmitting } = form.formState;
  
    const onSubmit = async (values: z.infer<typeof registerStep2Schema>) => {
      
      try {
        const {data: response} = await axios.post("/api/auth/register?step=2",{
          ...data,
          ...values,
        });

          
          if (response.success) {
            signIn("credentials", {
              email: data.email,
              password: values.password,
            });
              registerModel.onClose()
        }

      } catch (error) {
        if (error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Something went wrong");
        }
      }

    };
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-10">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
  
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
  
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    );
  }
  