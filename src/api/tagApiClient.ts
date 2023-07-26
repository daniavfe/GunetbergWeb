import { AxiosResponse } from "axios";
import ApiClient from "./apiClient";
import Tag from "../model/tag/tag";

export default class TagApiClient extends ApiClient{
    
    getTags(): Promise<AxiosResponse<Array<Tag>>> {
        return this.getClient().get<Array<Tag>>("/tags");
    }
}