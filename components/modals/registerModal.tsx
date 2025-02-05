import useRegisterModal from "@/hooks/useRegisterModal";
import { registerStep1Schema } from "@/lib/validation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form"
import * as z from "zod"

interface dataProps {
  name: string;
  email: string;
}

const RegisterModal = () => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<dataProps>({ name: "", email: "" });

  const registerModel = useRegisterModal();

  const bodyContent =
    step == 1 ? (
      <RegisterStep1 setData={setData} setStep={setStep} />
    ) : (
      <RegisterStep2 data={data} />
    );

  return <div></div>;
};

export default RegisterModal;


function RegisterStep1 ({
    setData,
    setStep
} : {
    setData: Dispatch<SetStateAction<{name: string, email: string}>>;
    setStep: Dispatch<SetStateAction<number>>;
}){

    const [error,useError] = useState("");

    const form = useForm<z.infer<typeof registerStep1Schema>>({
        
    })

}