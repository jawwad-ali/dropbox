"use client";

import { FileType } from "@/typings";
import { Button } from "../ui/button";

import { DataTable } from "./Table";
import { columns } from "./Columns";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";

import { db } from "@/firebase";

import { Skeleton } from "../ui/skeleton";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();

  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    // @ts-ignore
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().filename || doc.id,
      type: doc.data().type || "",
      fullname: doc.data().fullname || "",
      downloadURL: doc.data().downloadURL || "",
      size: doc.data().size || 0,
      timestamp: doc.data().timestamp
        ? new Date(doc.data().timestamp.seconds * 1000).toString()
        : "",
    }));

    setInitialFiles(files);
  }, [docs]);

  // Loading Skeleton
  if (docs?.docs.length === undefined)
    return (
      <div className="flex flex-col">
        {/* Skeleton for Button */}
        <Button variant="outline" className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        {/* Skeleton for Table */}
        <div className="border rounded-lg">
          {/* <div className="border-b h-12" /> */}
          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {/* Skeleton if there are no files */}
          {skeletonFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        className="w-fit ml-auto"
        variant="outline"
        onClick={() => {
          sort === "desc" ? setSort("asc") : setSort("desc");
        }}
      >
        Sort By {sort === "desc" ? "Oldest" : "Newest"}{" "}
      </Button>

      <DataTable data={initialFiles} columns={columns} />
    </div>
  );
};

export default TableWrapper;
