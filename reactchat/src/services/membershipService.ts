import { useState } from "react";
import useAxiosWithJwtInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";
import axios from "axios";

interface IuseServer {
    joinServer: (serverId: number) => Promise<void>;
    leaveServer: (serverId: number) => Promise<void>;
    isMember: (serverId: number) => Promise<boolean>;
    isUserMember: boolean;
    error: Error | null;
    isLoading: boolean;
  }


  const useMembership = (): IuseServer => {
    const jwtAxios = useAxiosWithJwtInterceptor()
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isUserMember, setIsUserMember] = useState(false)

    const joinServer = async (serverId: number): Promise<void> => {
        setIsLoading(true);
        try{
            await jwtAxios.post(`${BASE_URL}/membership/${serverId}/membership/`, {}, {withCredentials: true})
            setIsLoading(false)
            setIsUserMember(true)
        } catch (error: any) {
            setError(error)
            setIsLoading(false)
            throw error;
        }
    }

    const leaveServer = async (serverId: number): Promise<void> => {
        setIsLoading(true);
        try {
          await jwtAxios.delete(`${BASE_URL}/membership/${serverId}/membership/remove_member/`, { withCredentials: true });
          setIsLoading(false);
          setIsUserMember(false);
        } catch (error: any) {
          setError(error);
          setIsLoading(false);
          throw error;
        }
      };

      const isMember = async (serverId: number): Promise<any> => {
        setIsLoading(true);
        try {
          const response = await jwtAxios.get(`${BASE_URL}/membership/${serverId}/membership/is_member/`, { withCredentials: true });
          setIsLoading(false);
          setIsUserMember(response.data.is_member);
        } catch (error: any) {
          setError(error);
          
          setIsLoading(false);
          throw error;
        }
      };

    return { joinServer, leaveServer, error, isLoading, isMember, isUserMember }
  }
  export default useMembership