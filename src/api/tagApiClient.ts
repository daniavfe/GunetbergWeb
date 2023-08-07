import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";
import Tag from "../model/tag/tag";

const getTags = ():Promise<AxiosResponse<Array<Tag>>> => {
    return apiClient.get<Array<Tag>>("/tags");
}

export const tagApiClient = {
    getTags: getTags
}