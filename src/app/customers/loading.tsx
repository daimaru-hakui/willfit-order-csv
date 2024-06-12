import React from 'react'
import { RiLoader2Fill } from 'react-icons/ri'
// import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-250px)] w-full'>
        <RiLoader2Fill className="mr-2 h-12 w-12 animate-spin" />
    </div>
  )
}
