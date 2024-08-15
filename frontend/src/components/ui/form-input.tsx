import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";
import useBoolean from "@/hooks/useBoolean";

type Props = {
  control: any;
  label?: string;
  hint?: string;
  placeholder?: string;
  name: string;
  type?: string;
  secureTextEntry?: boolean;
  rightIcon?: any;
};

const FormInput = ({
  control,
  label,
  hint,
  placeholder,
  name,
  type = "text",
  secureTextEntry,
  rightIcon,
}: Props) => {
  const secureEntry = useBoolean(true);
  const IconComponent = rightIcon;
  const iconClassName =
    "w-5 absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground user-select-none cursor-pointer";
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative w-full">
            <FormControl>
              <Input
                className="pr-9"
                type={secureTextEntry && secureEntry.value ? "password" : type}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            {secureTextEntry &&
              (secureEntry.value ? (
                <Eye onClick={secureEntry.toggle} className={iconClassName} />
              ) : (
                <EyeOff
                  onClick={secureEntry.toggle}
                  className={iconClassName}
                />
              ))}
            {!secureTextEntry && rightIcon && (
              <IconComponent className={iconClassName} />
            )}
          </div>
          <FormDescription>{hint}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
