import { type AxiosResponse } from "axios";
import { apiClient } from "./apiClient";
import type Tag from "../model/tag/tag";

const getTags = async (): Promise<AxiosResponse<Tag[]>> => {
	return await apiClient.get<Tag[]>("/tags");
};

export const tagApiClient = {
	getTags
};
