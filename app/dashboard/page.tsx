import { auth } from "@clerk/nextjs";

import DropzoneComponent from "@/components/DropzoneComponent";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";

const Page = async () => {
  const { userId } = auth();

  const docsResult = await getDocs(collection(db, "users", userId!, "files"));

  // @ts-ignore
  const skeletonFiles: FileType[] = docsResult.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    type: doc.data().type || "", // Make sure type is assigned properly or provide a default value
    fullname: doc.data().fullname || "", // Provide default value if necessary
    downloadURL: doc.data().downloadURL || "", // Provide default value if necessary
    size: doc.data().size || 0, // Provide default value if necessary
    timestamp: doc.data().timestamp
      ? new Date(doc.data().timestamp.seconds * 1000).toString()
      : "", // Convert timestamp to string or provide default value if necessary
  }));

  console.log(skeletonFiles);

  return (
    <div className="border-t">
      <DropzoneComponent />


      <div className="container space-y-5">
        <h2 className="font-bold pt-5">All Files</h2>

        <div>
          {/* TableWrapper */}
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>

      </div>

    </div>
  );
};

export default Page;
