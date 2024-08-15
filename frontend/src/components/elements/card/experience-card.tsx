import { ExperienceEntry } from "@/app/(private)/onboarding/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatDate";
import { courseTypeOptions, degreeOptions } from "@/lib/options";
import {
  BookMarked,
  CalendarClock,
  GraduationCap,
  Pencil,
  Trash,
} from "lucide-react";

const ExperienceCard = ({
  Experience,
  handleOpenDialog,
  handleRemoveEntry,
}: {
  Experience: ExperienceEntry;
  handleOpenDialog: (value: ExperienceEntry) => void;
  handleRemoveEntry: (value: ExperienceEntry) => void;
}) => {
  return (
    <Card>
      <CardContent className="flex justify-between p-2 md:p-3 lg:p-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">{Experience.companyName}</h1>
          <h2 className="text-sm text-muted-foreground">
            {Experience.position ?? "Unknown Position"}
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <CalendarClock size={14} />
            <div className="flex items-center gap-1">
              {Experience.endDate ? (
                <>
                  <span>{formatDate(Experience.startDate)}</span>
                  <span>-</span>
                  <span>{formatDate(Experience.endDate)}</span>
                </>
              ) : (
                <>
                  <span>{formatDate(Experience.startDate)}</span>
                  <span>-</span>
                  <span>Currently Working</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Button
            className="aspect-square p-1 text-muted-foreground hover:text-blue-500"
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              handleOpenDialog(Experience);
            }}
          >
            <Pencil size={15} />
          </Button>
          <Button
            className="aspect-square p-1 text-muted-foreground hover:text-red-800"
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              handleRemoveEntry(Experience);
            }}
          >
            <Trash size={15} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
