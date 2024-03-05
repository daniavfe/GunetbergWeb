import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserApiPort } from "../../../config/di/businessModule";
import CompletePublicUser from "../../../domain/user/completePublicUser";

const useViewModel = ()=>{

    const { alias } = useParams();

    const userApiPort = useUserApiPort();

    const loadUser = async ()=>{
        if(!alias){
            return;
        }
        try{
            setIsLoading(true);
            const user = await userApiPort.getPublicUserByAlias(alias);
            setUser(user);
        }catch(exception){
            console.log("dasfadsfasdf");
        }finally{
            setIsLoading(false);
        }
    }

    const [user, setUser] = useState<CompletePublicUser>();
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(()=>{
        loadUser();
    }, []);

    useEffect(()=>{
        loadUser();
    }, [alias]);

    return {
        user: user,
        isLoading: isLoading
    };
};

export default useViewModel;