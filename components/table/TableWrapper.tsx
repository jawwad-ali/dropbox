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

    setInitialFiles(files)
  }, [docs]);

  return (
    <div>
      <Button
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
