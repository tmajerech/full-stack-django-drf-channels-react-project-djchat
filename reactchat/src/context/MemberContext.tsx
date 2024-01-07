import React, { createContext, useContext } from "react";
import useMembership from "../services/membershipService";

interface IuseServer {
  joinServer: (serverId: number) => Promise<void>;
  leaveServer: (serverId: number) => Promise<void>;
  isMember: (serverId: number) => Promise<boolean>;
  isUserMember: boolean;
  error: Error | null;
  isLoading: boolean;
}

const MembershipContext = createContext<IuseServer | null>(null);

export function MembershipProvider(props: React.PropsWithChildren<{}>) {
  const membership = useMembership();
  return (
    <MembershipContext.Provider value={membership}>
      {props.children}
    </MembershipContext.Provider>
  );
}

export function useMembershipContext(): IuseServer {
  const context = useContext(MembershipContext);

  if (context === null) {
    throw new Error("Error - You have to use the MembershipProvider");
  }
  return context;
}

export default MembershipProvider;
