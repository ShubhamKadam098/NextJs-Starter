import { Loader2, UploadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import useIsMobileScreen from "@/hooks/useIsMoblieScreen";
import { BACKEND_URL, JWT_TEMPLATE_NAME } from "@/constants/constants";

interface FileResponse {
  file_name: string;
  status: "success" | "error";
  message: string;
}

interface UploadResponse {
  status: "success" | "error";
  data: string;
  error_responses: FileResponse[];
  success_responses: FileResponse[];
}

const FileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const isMobile = useIsMobileScreen();

  // Callback when files are dropped
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: isUploading,
  });

  return (
    <>
      <div className="h-full">
        <label
          {...getRootProps()}
          className={`${
            isUploading ? "cursor-not-allowed" : "cursor-pointer"
          } relative mb-7 flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-6`}
        >
          <div className="flex h-36 flex-col items-center justify-center text-center">
            {isUploading ? (
              <div className="flex items-center gap-2 text-slate-700">
                <p className="text-lg font-semibold">Uploading</p>
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <>
                <div className="mx-auto max-w-min rounded-md border p-2">
                  <UploadIcon size={isMobile ? 20 : 30} />
                </div>
                <p className="mt-2 text-sm lg:text-lg">
                  <span className="font-semibold">Drag files</span>
                </p>
                <p className="lg:text-md text-xs">
                  Click to upload files &#40;files should be under 10 MB&#41;
                </p>
              </>
            )}
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          type="file"
          className="hidden"
          disabled={isUploading}
        />
      </div>
    </>
  );
};

export default FileUpload;
