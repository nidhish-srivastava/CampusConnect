import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <div className='p-6 flex items-center justify-end gap-6'>
      <Button>
      <Link href={`/signup`}>SignUp</Link>
      </Button>
      <Button>
        <Link href={`/login`} >Login</Link>
      </Button>
    </div>
  )
}

export default Navbar