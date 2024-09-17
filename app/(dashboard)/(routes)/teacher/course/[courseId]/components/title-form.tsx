"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

// validation
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 2 characters.",
  }),
});

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  // to descript the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result: any = await axios.patch(`/api/courses/${courseId}`, values);
      if (result === 200) {
        toast.success("Course title updated successfully");
        setIsEditing(!isEditing);
      }
    } catch (error: any) {
      toast.error("Failed to update course title" + error.message);
    }
  };
  return (
    <div className="mt-6 border  bg-slate-100  rounded-md p-4">
      <div className="font-medium flex items-center  justify-between">
        Course Title
        <Button onClick={() => setIsEditing(!isEditing)} variant={"ghost"}>
          {isEditing ? (
            "Cancel"
          ) : (
            <div className="flex items-center gap-1">
              <Pencil className="h-4 w-4" /> Edit Title
            </div>
          )}
        </Button>
      </div>
      <div>
        {!isEditing && <p>{initialData.title}</p>}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                // control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Course Title" {...field} />
                    </FormControl>
                    <Button disabled={isSubmitting || !isValid}>Save</Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default TitleForm;
