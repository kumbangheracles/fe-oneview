"use client";

import { Input } from "@/components/ui/input";

import { useState } from "react";

export function FileUpload() {
  const [fileName, setFileName] = useState<string>("");

  return (
    <div className="flex flex-col gap-2">
      <Input
        id="file"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setFileName(file.name);
        }}
      />
      {/* {fileName && (
        <p className="text-sm text-muted-foreground">Selected: {fileName}</p>
      )} */}
    </div>
  );
}
