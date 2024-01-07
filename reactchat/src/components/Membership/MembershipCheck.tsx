import { useEffect } from "react";
import { useMembershipContext } from "../../context/MemberContext";
import { useParams } from "react-router-dom";

interface MembershipCheckProps {
  children: any;
}

const MembershipCheck: React.FC<MembershipCheckProps> = ({ children }) => {
  const { serverId } = useParams();
  const { isMember } = useMembershipContext();

  useEffect(() => {
    const checkMembership = async () => {
      try {
        await isMember(Number(serverId));
      } catch (error) {
        console.log("Error checking membership status", error);
      }
    };
    checkMembership();
  }, [serverId]);

  return <>{children}</>;
};

export default MembershipCheck;
