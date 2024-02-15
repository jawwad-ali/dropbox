import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-fit ">
          <Image
            src="https://www.shareicon.net/data/256x256/2017/07/08/888138_network_512x512.png"
            alt="logo"
            height={50} 
            width={50}
          /> 
        </div>
        <h1 className="text-xl font-bold">Dropbox</h1>
      </Link>


      <div className="px-5 flex space-x-2 items-center">
        {/* User theme toggler */}
        <ThemeToggler />

        {/* User signIn Signout */}
        <UserButton afterSignOutUrl="/" />

        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut> 

      </div>

    </header>
  );
}
