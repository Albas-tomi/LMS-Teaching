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

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 2 characters.",
  }),
});

const CreatePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, isValid } = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="max-w-5xl  mx-auto h-full flex flex-col items-center p-5 md:p-0">
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
