"use client";

import { useAppStore } from "@/store/store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUser } from "@clerk/nextjs";
import { db, storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";

export function DeleteModal() {
  const { user } = useUser(); // User id

  const [fieldId, setFieldId, isDeleteModalOpen, setIsDeleteModalOpen] = // Global States
    useAppStore((state) => [
      state.fieldId,
      state.setFieldId,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]);

    // Deleting The File
  async function deleteFile() {
    if (!user || !fieldId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fieldId}`); //Getting the file from firebase storage
    const docRef = doc(db, "users", user.id, "files", fieldId) // Getting the document from firebase firestore
    
    try { 
      deleteObject(fileRef).then(async () => {
        deleteDoc(docRef).then(() => {
          console.log("File Deleted");
        }); 

      })
      .finally(() => {
        setIsDeleteModalOpen(false)
      })

    } 
    catch (err) {
      console.error(`Error while deleting the file`);
      setIsDeleteModalOpen(false)
    }

  
}

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>The action cannot be undone.</DialogDescription>
        </DialogHeader>

        <div className="flex space-x-3 py-3">
          <Button
            variant="ghost"
            size="sm"
            className="px-3 flex-1"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
