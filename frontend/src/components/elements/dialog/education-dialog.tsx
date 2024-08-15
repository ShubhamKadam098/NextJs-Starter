import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/icon-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { courses, courseTypeOptions, degreeOptions } from "@/lib/options";

const educationSchema = z.object({
  degree: z.string().nonempty({ message: "Degree is required" }),
  course: z.string().nonempty({ message: "Course is required" }),
  college: z.string().nonempty({ message: "College name is required" }),
  gpa: z.coerce.number().min(0).max(10),
  courseType: z.string().nonempty({ message: "Course type is required" }),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: EducationFormValues) => void;
  entry?: EducationFormValues | null;
}

const EducationDialog: React.FC<EducationDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  entry,
}) => {
  const [degreeChanged, setDegreeChanged] = useState(false);

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      course: "",
      college: "",
      gpa: undefined,
      courseType: "",
    },
  });

  useEffect(() => {
    if (entry) {
      form.reset({
        degree: entry.degree || "",
        course: entry.course || "",
        college: entry.college || "",
        gpa: entry.gpa || undefined,
        courseType: entry.courseType || "",
      });
    }
  }, [entry, form]);

  const handleFormSubmit: SubmitHandler<EducationFormValues> = (data) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{entry ? "Edit Education" : "Add Education"}</DialogTitle>
        <DialogDescription>
          {`Fill out the form below to ${entry ? "add" : "edit"} your educational details.`}
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4 md:flex-row">
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
                      value={field.value}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                key={String(degreeChanged)}
                name="course"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Course</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses[form.getValues("degree")]?.map((option) => (
                          <SelectItem key={option.key} value={option.key}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mumbai University, Harvard, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input type="number" placeholder="0-10.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <FormField
                control={form.control}
                name="courseType"
                render={({ field }) => (
                  <FormItem className="flex-1 ">
                    <FormLabel>Course Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
                variant={"outline"}
                className="ml-2"
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EducationDialog;
