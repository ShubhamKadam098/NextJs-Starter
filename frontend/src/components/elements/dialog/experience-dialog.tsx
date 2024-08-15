import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/icon-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

const experienceSchema = z.object({
  companyName: z.string().nonempty({ message: "Company name is required" }),
  position: z.string().nonempty({ message: "Position is required" }),
  startDate: z.date({
    required_error: "A start date is required.",
  }),
  endDate: z.date().optional(),
  isCurrentyWorking: z.boolean(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: ExperienceFormValues) => void;
  entry?: ExperienceFormValues | null;
}

const ExperienceDialog: React.FC<ExperienceDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  entry,
}) => {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      companyName: "",
      position: "",
      startDate: undefined,
      endDate: undefined,
      isCurrentyWorking: false,
    },
  });

  useEffect(() => {
    if (entry) {
      form.reset({
        companyName: entry.companyName,
        position: entry.position,
        startDate: entry.startDate,
        endDate: entry?.endDate,
        isCurrentyWorking: entry.isCurrentyWorking,
      });
    }
  }, [entry, form]);

  const handleFormSubmit: SubmitHandler<ExperienceFormValues> = (data) => {
    if (data.isCurrentyWorking) {
      data.endDate = undefined;
    }
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-fit">
        <DialogTitle>
          {entry ? "Edit experience" : "Add experience"}
        </DialogTitle>
        <DialogDescription>
          {`Fill out the form below to ${entry ? "add" : "edit"} your experience details.`}
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        StartIcon={Building2}
                        placeholder="Google, Meta, Microsoft,  etc "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Project Manager, Software Engineer, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-1 flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={form.watch("isCurrentyWorking")}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <
                              (form.watch("startDate")
                                ? form.getValues("startDate")
                                : new Date()) ||
                            date > new Date() ||
                            date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="isCurrentyWorking"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="workHere"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                        <label
                          htmlFor="workHere"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Currently working here
                        </label>
                      </div>
                    </FormControl>
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

export default ExperienceDialog;
