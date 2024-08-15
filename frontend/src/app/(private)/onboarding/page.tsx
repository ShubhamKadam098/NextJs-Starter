"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import FileUpload from "@/components/elements/upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/icon-input";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalizeWords } from "@/lib/stringOperations";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarClock,
  CalendarIcon,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { genderOptions, optionsType } from "@/lib/options";
import { Badge } from "@/components/ui/badge";
import EducationDialog from "@/components/elements/dialog/education-dialog";
import EducationCard from "@/components/elements/card/education-card";
import ExperienceDialog from "@/components/elements/dialog/experience-dialog";
import ExperienceCard from "@/components/elements/card/experience-card";
import { Separator } from "@/components/ui/separator";

const validGenderEnum = z.enum(["male", "female", "other"]);

const genderSchema = z
  .string()
  .refine((val) => val === "" || validGenderEnum.safeParse(val).error, {
    message: "Please select a valid gender.",
  });

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
    invalid_type_error: "Please enter a valid date.",
  }),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender.",
    required_error: "Please select a gender",
    invalid_type_error: "Please select a valid option",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contact: z
    .string()
    .min(10, {
      message: "Contact number must be exactly 10 digits.",
    })
    .max(10, {
      message: "Contact number must be exactly 10 digits.",
    }),
  positions: z
    .array(
      z.string().min(2, {
        message: "Position name must be at least 2 characters.",
      }),
    )
    .min(1, {
      message: "At least one position must be specified.",
    }),
  expected_salary: z.coerce
    .number({
      required_error: "Expected salary is required.",
      invalid_type_error: "Please enter a valid number.",
    })
    .min(0, {
      message: "Expected salary must be a positive number.",
    })
    .positive({
      message: "Expected salary must be greater than zero.",
    }),
  noticePeriod: z.coerce
    .number({
      required_error: "Notice period is required.",
      invalid_type_error: "Please enter a valid number.",
    })
    .positive({
      message: "Notice period must be a positive number.",
    })
    .min(0, {
      message: "Notice period must be greater than or equal to 0.",
    }),
  locations: z
    .array(
      z.string().min(2, {
        message: "Location name must be at least 2 characters.",
      }),
    )
    .min(1, {
      message: "At least one location must be specified.",
    }),
  skills: z
    .array(
      z.string().min(2, {
        message: "Skill name must be at least 2 characters.",
      }),
    )
    .min(1, {
      message: "At least one skill must be specified.",
    }),
  termsAndCondtion: z.boolean().refine((val) => val === true, {
    message: "Please accept our terms and conditions",
  }),
});

export interface EducationEntry {
  degree: string;
  course: string;
  college: string;
  gpa: number;
  courseType: string;
}
export interface ExperienceEntry {
  companyName: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  isCurrentyWorking: boolean;
}

const Onboarding = () => {
  const user = useUserStore((state) => state.user);
  const [positionInput, setPositionInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [positionChanged, setPositionChanged] = useState(false);
  const [skillsChanged, setSkillsChanged] = useState(false);
  const [locationsChanged, setLocationsChanged] = useState(false);

  // Form setup
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: user?.firstName ? user.firstName : "",
      middleName: "",
      lastName: user?.lastName ? user.lastName : "",
      dob: undefined,
      gender: undefined,
      email: user?.primaryEmailAddress?.emailAddress
        ? user.primaryEmailAddress.emailAddress
        : "",
      contact: "",
      positions: [],
      expected_salary: undefined,
      noticePeriod: undefined,
      locations: [],
      skills: [],
      termsAndCondtion: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const newData = {
      ...data,
      education: educationEntries,
      experience: experienceEntries,
    };
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
        </pre>
      ),
    });
  }

  const handleClearForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset();
  };

  //handle education dialog
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>(
    [],
  );
  const [openEducationDialog, setOpenEducationDialog] = useState(false);
  const [currentEducationEntry, setCurrentEducationEntry] =
    useState<EducationEntry | null>(null);

  const handleOpenEducationDialog = (entry: EducationEntry | null = null) => {
    setCurrentEducationEntry(entry);
    setOpenEducationDialog(true);
  };

  const handleCloseEducationDialog = () => {
    setOpenEducationDialog(false);
    setCurrentEducationEntry(null);
  };

  const handleAddOrEditEducationEntry = (entry: EducationEntry) => {
    if (currentEducationEntry) {
      // Editing existing entry
      setEducationEntries(
        educationEntries.map((e) => (e.degree === entry.degree ? entry : e)),
      );
    } else {
      // Adding new entry
      setEducationEntries([...educationEntries, entry]);
    }
  };

  const handleRemoveEducationEntry = (entry: EducationEntry) => {
    setEducationEntries(
      educationEntries.filter((e) => {
        return e.degree !== entry.degree;
      }),
    );
  };

  //handle experience dialog
  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>(
    [],
  );
  const [experienceDialogOpen, setExperienceDialogOpen] = useState(false);
  const [currentExperienceEntry, setCurrentExperienceEntry] =
    useState<ExperienceEntry | null>(null);

  const handleOpenExperienceDialog = (entry: ExperienceEntry | null = null) => {
    setCurrentExperienceEntry(entry);
    setExperienceDialogOpen(true);
  };

  const handleCloseExperienceDialog = () => {
    setExperienceDialogOpen(false);
    setCurrentExperienceEntry(null);
  };

  const handleAddOrEditExperienceEntry = (entry: ExperienceEntry) => {
    if (currentEducationEntry) {
      // Editing existing entry
      setExperienceEntries(
        experienceEntries.map((e) =>
          e.companyName === entry.companyName ? entry : e,
        ),
      );
    } else {
      // Adding new entry
      setExperienceEntries([...experienceEntries, entry]);
    }
  };

  const handleRemoveExperienceEntry = (entry: ExperienceEntry) => {
    setExperienceEntries(
      experienceEntries.filter((e) => {
        return e.companyName !== entry.companyName;
      }),
    );
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="grid gap-6">
        <Form {...form}>
          <form className="space-y-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle className="text-3xl">Welcome Onboard!</CardTitle>
                <CardDescription>
                  {user?.firstName && (
                    <p className="flex-1 shrink-0 whitespace-nowrap text-base font-semibold tracking-tight sm:grow-0">
                      Hello, {capitalizeWords(user.firstName)}
                    </p>
                  )}{" "}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {/* Personal Details */}
                <div className="flex flex-col gap-3">
                  <Label className="mb-3 text-lg">Personal Details </Label>
                  <Label className="">Name</Label>
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="First" {...field} />
                          </FormControl>
                          <FormDescription>
                            <FormMessage />
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Middle (Optional)" {...field} />
                          </FormControl>
                          <FormDescription>
                            <FormMessage />
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Last" {...field} />
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
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col">
                          <FormLabel className="py-1">Date of birth</FormLabel>
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
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
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {genderOptions.map((option: optionsType) => (
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
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              StartIcon={Mail}
                              placeholder="johndoe@example.com"
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
                      name="contact"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Contact</FormLabel>
                          <FormControl>
                            <Input
                              StartIcon={Phone}
                              placeholder="9876543210"
                              {...field}
                              type="number"
                            />
                          </FormControl>
                          <FormDescription>
                            <FormMessage />
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator />

                {/* Education Details */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg">Education</Label>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenEducationDialog();
                      }}
                    >
                      Add Education
                    </Button>
                  </div>

                  {educationEntries.map((entry, index) => (
                    <EducationCard
                      key={index}
                      Education={entry}
                      handleOpenDialog={handleOpenEducationDialog}
                      handleRemoveEntry={handleRemoveEducationEntry}
                    />
                  ))}

                  <EducationDialog
                    isOpen={openEducationDialog}
                    onClose={handleCloseEducationDialog}
                    onSubmit={handleAddOrEditEducationEntry}
                    entry={currentEducationEntry}
                  />
                </div>
                <Separator />

                {/* Preference Details */}
                <div className="flex flex-col gap-3">
                  <Label className="mb-3 text-lg">Preferences </Label>
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="positions"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Desired Positions</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id="position"
                              placeholder="Senior Software Engineer, Project Manger, Architect"
                              value={positionInput}
                              onChange={(e) => {
                                setPositionInput(e.target.value);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  form.setValue("positions", [
                                    ...form.getValues("positions"),
                                    positionInput,
                                  ]);
                                  setPositionInput("");
                                  form.clearErrors("positions");
                                }
                              }}
                            />
                          </FormControl>
                          <div
                            className={`flex flex-wrap items-center gap-1 md:gap-2`}
                            key={String(positionChanged)}
                          >
                            {form
                              .getValues("positions")
                              .map((position, index) => (
                                <Badge
                                  key={position}
                                  variant={"secondary"}
                                  className="flex items-center gap-1 rounded-md"
                                >
                                  <span>{position}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      console.log("Clear clicked for", index);

                                      form.setValue(
                                        "positions",
                                        form
                                          .getValues("positions")
                                          .filter((_, i) => i !== index),
                                      );
                                      setPositionChanged((prev) => !prev);
                                    }}
                                  >
                                    x
                                  </button>
                                </Badge>
                              ))}
                          </div>
                          <FormDescription>
                            <FormMessage />
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expected_salary"
                      render={({ field, fieldState }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Expected Salary</FormLabel>
                          <FormControl>
                            <Input
                              StartIcon={IndianRupee}
                              type="text"
                              placeholder="In Rupees"
                              value={field.value}
                              onChange={(e) => {
                                const value = e.target.value;

                                if (value === "" || value === null) {
                                  field.onChange("");
                                  form.clearErrors("expected_salary");
                                  return;
                                }

                                try {
                                  const parsedValue = parseInt(value, 10);
                                  if (isNaN(parsedValue))
                                    throw new Error("Invalid number");
                                  field.onChange(parsedValue);
                                  form.clearErrors("expected_salary");
                                } catch (error) {
                                  form.setError("expected_salary", {
                                    type: "manual",
                                    message: "Please enter a valid number",
                                  });
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            <FormMessage>
                              {fieldState.error?.message}
                            </FormMessage>
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="noticePeriod"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Notice Period</FormLabel>
                          <FormControl>
                            <Input
                              StartIcon={CalendarClock}
                              type="text"
                              placeholder="in days"
                              value={field.value}
                              onChange={(e) => {
                                const value = e.target.value;

                                if (value === "" || value === null) {
                                  field.onChange("");
                                  form.clearErrors("noticePeriod");
                                  return;
                                }

                                try {
                                  const parsedValue = parseInt(value, 10);
                                  if (isNaN(parsedValue))
                                    throw new Error("Invalid number");
                                  field.onChange(parsedValue);
                                  form.clearErrors("noticePeriod");
                                } catch (error) {
                                  form.setError("noticePeriod", {
                                    type: "manual",
                                    message: "Please enter a valid number",
                                  });
                                }
                              }}
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
                      name="locations"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Preferred Locations</FormLabel>
                          <FormControl>
                            <Input
                              StartIcon={MapPin}
                              type="text"
                              id="locations"
                              placeholder="Mumbai, Bangalore, Pune, etc."
                              value={locationInput}
                              onChange={(e) => {
                                setLocationInput(e.target.value);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  form.setValue("locations", [
                                    ...form.getValues("locations"),
                                    locationInput,
                                  ]);
                                  setLocationInput("");
                                  form.clearErrors("locations");
                                }
                              }}
                            />
                          </FormControl>
                          <div
                            className={`flex flex-wrap items-center gap-1 md:gap-2`}
                            key={String(locationsChanged)}
                          >
                            {form
                              .getValues("locations")
                              .map((location, index) => (
                                <Badge
                                  key={location}
                                  variant={"secondary"}
                                  className="flex items-center gap-1 rounded-md"
                                >
                                  <span>{location}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      form.setValue(
                                        "locations",
                                        form
                                          .getValues("locations")
                                          .filter((_, i) => i !== index),
                                      );
                                      setLocationsChanged((prev) => !prev);
                                    }}
                                  >
                                    x
                                  </button>
                                </Badge>
                              ))}
                          </div>
                          <FormDescription>
                            <FormMessage />
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-start gap-4">
                    <Label className="py-2 pr-2 text-base md:pl-1 md:pr-4 lg:pr-6">
                      Skills
                    </Label>
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="text"
                              id="skills"
                              placeholder="React, Node.js, Python, etc."
                              value={skillsInput}
                              onChange={(e) => {
                                setSkillsInput(e.target.value);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  form.setValue("skills", [
                                    ...form.getValues("skills"),
                                    skillsInput,
                                  ]);
                                  setSkillsInput("");
                                  form.clearErrors("skills");
                                }
                              }}
                            />
                          </FormControl>
                          <div
                            className={`flex flex-wrap items-center gap-1 md:gap-2`}
                            key={String(skillsChanged)}
                          >
                            {form.getValues("skills").map((skill, index) => (
                              <Badge
                                key={skill}
                                variant={"secondary"}
                                className="flex items-center gap-1 rounded-md"
                              >
                                <span>{skill}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    form.setValue(
                                      "skills",
                                      form
                                        .getValues("skills")
                                        .filter((_, i) => i !== index),
                                    );
                                    setSkillsChanged((prev) => !prev);
                                  }}
                                >
                                  x
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <FormDescription>
                            <FormMessage />
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator />
                {/* Experience Details */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg">Experience</Label>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenExperienceDialog();
                      }}
                      className="px-2 py-1 text-xs"
                    >
                      <Plus />
                    </Button>
                  </div>

                  {experienceEntries.map((entry, index) => (
                    <ExperienceCard
                      key={index}
                      Experience={entry}
                      handleOpenDialog={handleOpenExperienceDialog}
                      handleRemoveEntry={handleRemoveExperienceEntry}
                    />
                  ))}

                  <ExperienceDialog
                    isOpen={experienceDialogOpen}
                    onClose={handleCloseExperienceDialog}
                    onSubmit={handleAddOrEditExperienceEntry}
                    entry={currentExperienceEntry}
                  />
                </div>
                <Separator />
                {/* Resume upload */}
                <div className="flex flex-col gap-3">
                  <Label className="mb-2">Resume</Label>
                  <FileUpload />
                </div>

                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name="termsAndCondtion"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          className="text-primary-500"
                          checked={field.value}
                          onCheckedChange={(checked: boolean) => {
                            field.onChange(checked);
                          }}
                        />
                        <Label htmlFor="terms">
                          Accept terms and conditions
                        </Label>
                      </div>
                      <FormDescription>
                        <FormMessage />
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Button variant={"ghost"} onClick={handleClearForm}>
                  Clear
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Onboarding;
