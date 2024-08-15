import { EducationEntry } from "@/app/(private)/onboarding/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courseTypeOptions, degreeOptions } from "@/lib/options";
import { BookMarked, GraduationCap, Pencil, Trash } from "lucide-react";

const EducationCard = ({
  Education,
  handleOpenDialog,
  handleRemoveEntry,
}: {
  Education: EducationEntry;
  handleOpenDialog: (value: EducationEntry) => void;
  handleRemoveEntry: (value: EducationEntry) => void;
}) => {
  return (
    <Card>
      <CardContent className="flex justify-between p-2 md:p-3 lg:p-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">{Education.college}</h1>
          <h2 className="text-sm text-muted-foreground">
            {degreeOptions.find((option) => option.key === Education.degree)
              ?.label ?? "Unknown Degree"}
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <GraduationCap size={14} />
              <span>{Education.gpa}</span>
            </div>
            <span className="flex items-center gap-1">
              <BookMarked size={14} />
              {courseTypeOptions.find(
                (option) => option.key === Education.courseType,
              )?.label ?? "Unknown Course Type"}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Button
            className="aspect-square p-1 text-muted-foreground hover:text-blue-500"
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              handleOpenDialog(Education);
            }}
          >
            <Pencil size={15} />
          </Button>
          <Button
            className="aspect-square p-1 text-muted-foreground hover:text-red-800"
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              handleRemoveEntry(Education);
            }}
          >
            <Trash size={15} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCard;
