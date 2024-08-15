"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { courses, courseTypeOptions, degreeOptions } from "@/lib/options";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  degree: z.enum(
    degreeOptions.map((option) => option.key) as [string, ...string[]],
  ),
  course: z.string().min(1),
  college: z.string().min(2),
  gpa: z.number().max(10).min(0),
  courseType: z.enum(
    courseTypeOptions.map((option) => option.key) as [string, ...string[]],
  ),
});

const defaultValues = {
  degree: "",
  course: "",
  college: "",
  gpa: 0,
  courseType: "",
};

type EducationDialogProps = {
  initialValue?: z.infer<typeof FormSchema>;
  educations: z.infer<typeof FormSchema>[];
  setUserEducation: (education: z.infer<typeof FormSchema>[]) => void;
};

const EducationDialog = ({
  initialValue,
  educations,
  setUserEducation,
}: EducationDialogProps) => {
  const [degreeChanged, setDegreeChanged] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValue || defaultValues,
  });

  return (
    <section className="flex flex-col gap-3">
      <Label className="mb-3 text-lg">Education</Label>
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Degree / Qualification</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                  setDegreeChanged((prev) => !prev);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your qualification" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {degreeOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                <FormMessage />
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          key={String(degreeChanged)}
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses[form.getValues("degree")] &&
                    courses[form.getValues("degree")]?.map((option) => (
                      <SelectItem key={option.key} value={option.key}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                <FormMessage />
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                <FormMessage />
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gpa"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>GPA</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0 - 10.0" {...field} />
              </FormControl>
              <FormDescription>
                <FormMessage />
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="courseType"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Course Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your course type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courseTypeOptions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                <FormMessage />
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
};

export default EducationDialog;
