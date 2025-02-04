"use client";
import { Suspense } from "react";
import { ClipLoader } from 'react-spinners';
import WritePageContent from "./WritePageContent";

export default function WritePageWrapper() {
  return (
    <Suspense fallback={
      <div className='fixed bg-white h-screen w-full inset-0 z-50 flex items-center justify-center'>
      <ClipLoader color='#000' size={35} />
      </div>
    }>
      <WritePageContent />
    </Suspense>
  );
}