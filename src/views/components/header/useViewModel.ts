import { useUserContextConsumer } from "../../../config/di/contextModule";

const useViewModel = ()=>{
    const userContextConsumer = useUserContextConsumer();

    return {
        userContextConsumer: userContextConsumer
    }
};

export default useViewModel;