/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { AdminAuthorDto } from './AdminAuthorDto';
import type { SimpleTagDto } from './SimpleTagDto';

export type AdminPostDto = {
    id?: string;
    language?: string | null;
    title?: string | null;
    createdAt?: string;
    author?: AdminAuthorDto;
    tags?: Array<SimpleTagDto> | null;
};
