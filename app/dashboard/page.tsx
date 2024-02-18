import {auth} from "@clerk/nextjs"

import DropzoneComponent from "@/components/DropzoneComponent"

const Page = () => {
  const { userId } = auth()
  return (
    <div> 
      <DropzoneComponent />
    </div> 
  )
}

export default Page