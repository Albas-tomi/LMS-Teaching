import { db } from "@/lib/db";
import { DashIcon } from "@radix-ui/react-icons";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./components/title-form";

const DetailCoursePage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) {
    return redirect("/");
  }

  // is required field empty
  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.imageUrl,
    course.categoryId,
  ];

  // to get total fields
  const totalfields = requiredFields.length;

  // to get completed fields
  // filter(Boolean) is used to remove falsy values
  // (menyaring data yang kosong jika isi maka dianggap completed)
  const completedFields = requiredFields.filter(Boolean).length;

  // for progress bar
  // cek apakah semua field terisi
  const completionText = `${completedFields}/${totalfields}`;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-y-2 flex-col">
          <h1>Course Setup</h1>
          <span>{completionText}</span>
        </div>
      </div>
      <div className="mt-16 flex flex-col  gap-3">
        <div className="flex gap-3">
          <LayoutDashboard className="text-blue-600 h-7 w-7 bg-blue-100 p-1 rounded-md" />
          <h2>Costumize Course</h2>
        </div>
        <TitleForm initialData={course} courseId={course.id} />
      </div>
    </div>
  );
};

export default DetailCoursePage;
