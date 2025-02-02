"use client"

import { useSession } from "next-auth/react"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react";

const CustomSessionContext = createContext();

export const CustomSessionProvider = ({ children }) => {
  const { data: session, status, update } = useSession();
  const [userSession, setUserSession] = useState(session);
  const userStatus = status;

  useEffect(() => {
    setUserSession(session);
  }, [session, status]);

  return (
    <CustomSessionContext.Provider value={{ userSession, updateSession: update, userStatus }}>
      {children}
    </CustomSessionContext.Provider>
  )
}

export const useUserSession = () => useContext(CustomSessionContext);

export function Provider({ children }) {
  return (
    <NextAuthSessionProvider>
      <CustomSessionProvider>{children}</CustomSessionProvider>
    </NextAuthSessionProvider>
  );
}

export default Provider;