"use client";
import { cn } from "@/lib/utils";

import { useState } from "react";

import Dropzone from "react-dropzone";

import { useUser } from "@clerk/nextjs";

export default function Home() {
  
  const [loading , setLoading] = useState<boolean>(false) // loading state
  const { user, isSignedIn, isLoaded } = useUser();

  const maxSize = 20971520; //20 MB 

  const onDrop = (acceptedFiles:File[]) => {

    // using for each if one then one file is uploaded
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')

      reader.onload = async () => {
        await uploadPost(file)
      }
      reader.readAsArrayBuffer(file)

    })
  }

  const uploadPost = async (file:File) => {
    if (loading) return;
    if (!user) return;
    
    setLoading(true)

    setLoading(false)
  }

  return (
    <Dropzone
      minSize={0}
      maxSize={maxSize}
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400 "
              )}
            >
              <input {...getInputProps()} />  

              {!isDragActive && "Click here or drop a file to upload"}

              {isDragActive && !isDragReject && "Drop to upload this file!"}

              {isDragReject && "File cannot be uploaded"}

              {isFileTooLarge && "File is too big. Cannot be more than 20MB."}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}
