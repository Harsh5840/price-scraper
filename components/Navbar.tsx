import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-xl font-bold">DealDynamo</h1>
        </Link>
        {/* Other nav links */}
      </div>
      
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton 
            mode="modal"
            forceRedirectUrl="/"
          >
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar