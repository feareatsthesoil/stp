"use client";

import { DirectoryRow } from "@/types";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserMetadata {
  profile?: DirectoryRow;
  userId?: string;
  loggedIn?: boolean;
  initialized: boolean;
  refresh: () => any;
  purchase?: { id: number; expiryDate: string };
  isEdu?: boolean;
  isMember?: boolean;
  isSeedHolder?: boolean;
}

export const UserContext = createContext<UserMetadata>({
  initialized: false,
  refresh: () => {},
  isEdu: false,
  isMember: false,
  isSeedHolder: false,
});

export const UserProvider = (props: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [initialized, setInitialized] = useState(false);

  const [metadata, setMetadata] = useState<UserMetadata | {}>();
  const { isSignedIn } = useAuth();

  const loadData = () =>
    axios
      .get("/api/verify/meta")
      .then(({ data }) => {
        setMetadata(data);
        setLoggedIn(!!data.user);
      })
      .catch(() => {
        setMetadata({});
        setLoggedIn(false);
      })
      .then(() => {
        setInitialized(true);
      });
  useEffect(() => {
    setInitialized(false);
    setLoggedIn(false);
    setMetadata({});
    loadData();
  }, [isSignedIn]);
  useEffect(() => {}, []);
  const refresh = () => {
    return loadData();
  };
  return (
    <UserContext.Provider
      value={{ ...metadata, initialized, loggedIn, refresh }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
