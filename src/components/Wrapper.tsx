"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <div className="w-screen h-auto flex justify-center">
          <div className="w-1/3 h-auto">{children}</div>
        </div>
      </SessionProvider>
    </>
  );
}

export default Wrapper;
