import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      {/* Right */}
      <div className="flex flex-col lg:flex-row items-center bg-[#1e1e1e] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5 ">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox. 
            <br /> <br />
            Storing everything for you and your business needs. All in one
            place.
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            qui tenetur facere tempora, molestias id maxime soluta odit, quam,
            aut vitae ex molestiae recusandae sed tempore dolor sequi libero ea.
            Magni mollitia suscipit placeat voluptatibus commodi perferendis
            vero esse quos incidunt eveniet qui, distinctio ratione veniam velit
            aspernatur illum officia obcaecati ex?
          </p>

          <Link
            href="/dashboard"
            className="flex items-center cursor-pointer bg-blue-500 w-fit p-5"
          >
            Try it for free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        {/* Left */}
        {/* video div */}
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

    </main>
  );
}

// 55.01
