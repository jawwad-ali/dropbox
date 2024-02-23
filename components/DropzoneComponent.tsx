"use client";
import { cn } from "@/lib/utils";

import { useState } from "react"; 

import Dropzone from "react-dropzone";

import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function DropzoneComponent() { 
  const [loading, setLoading] = useState<boolean>(false); // loading state
  const { user, isSignedIn, isLoaded } = useUser();

  const maxSize = 20971520; //File cannot be more than 20 MB.

  const onDrop = (acceptedFiles: File[]) => {
    // using for each if one then one file is uploaded
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      filename: selectedFile.name,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    // Upload Image to the Firebase storage
    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    
    try{
      
      // Firebase function to upload the selected Image
      await uploadBytes(imageRef,selectedFile)

      // Get download URL
      const downloadURL = await getDownloadURL(imageRef);

      // Updating the document after getting the downloadURL
      await updateDoc(doc(db , "users" , user.id, "files" ,docRef.id ), {
        downloadURL: downloadURL
      })

    }
    catch(err){
      console.log(err) // Consoling the error if there is any
    }

    setLoading(false);
  };

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
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
          <section className="m-5">
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
