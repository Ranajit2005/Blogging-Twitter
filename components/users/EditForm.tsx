import { IUser } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validation";
import axios from "axios";
import useEditModal from "@/hooks/useEditModal";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import EditModal from "./EditModal";
// import { useSession } from "next-auth/react";

const EditForm = ({ user }: { user: IUser }) => {
  const editModal = useEditModal();
  const router = useRouter();
  const { toast } = useToast();
  // const currentUser = useSession();

  // console.log("->",currentUser?.data?.currentUser?.[0]?._id)

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      location: user.location || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof userSchema>) => {

    try {
      const { data } = await axios.put(`/api/users/${user?._id}?type=updateFields`,values);

      if (data.success) {
        editModal.onClose();
        router.refresh();
      }

    } catch (error: any) {
      if (error.response.data.error) {
        return toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
        });
      } else {
        return toast({
          title: "Error",
          description: "Something went wrong, please try again later",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>

      {/* <EditModal user={user} /> */}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
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
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default EditForm;
