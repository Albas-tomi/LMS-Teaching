"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

// validation
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 2 characters.",
  }),
});

const CreatePage = () => {
  // to descript the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // to submit status
  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.post("/api/courses", values);
      if (result.status === 200) {
        toast.success("Course created successfully");

        router.push(`/teacher/course/${result.data.id}`);
      }
    } catch (error: any) {
      toast.error("Failed to create course", {
        description: error.message,
      });
    }
  };

  return (
    <div className="max-w-5xl md:my-auto mx-auto h-full flex flex-col items-center p-5 md:p-0">
      <div className="my-4">
        <h1 className="text-xl font-semibold">Create Course</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Course Title" {...field} />
                </FormControl>
                <FormDescription>This is your course title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex  items-center gap-x-2">
            <Link href={"/teacher/course"}>
              <Button type="button" variant={"secondary"}>
                Cancel
              </Button>
            </Link>
            <Button disabled={isSubmitting || !isValid} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;
