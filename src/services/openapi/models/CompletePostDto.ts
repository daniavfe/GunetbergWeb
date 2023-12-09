/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */

import type { AuthorDto } from './AuthorDto';
import type { SimpleTagDto } from './SimpleTagDto';

export type CompletePostDto = {
    id?: string;
    language?: string | null;
    title?: string | null;
    imageUrl?: string | null;
    content?: string | null;
    createdAt?: string;
    tags?: Array<SimpleTagDto> | null;
    author?: AuthorDto;
};
