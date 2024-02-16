import {auth} from "@clerk/nextjs"

import Dropzone from "@/components/Dropzone"

const Page = () => {
  const { userId } = auth()
  return (
    <div>
      <Dropzone />
    </div>
  )
}

export default Page