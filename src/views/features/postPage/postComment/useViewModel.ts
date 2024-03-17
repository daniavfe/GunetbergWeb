import { useEffect, useState } from "react"
import { useCommentApiPort } from "../../../../config/di/businessModule";
import GetCommentsRequest from "../../../../domain/comment/getCommentsRequest";
import Comment from "../../../../domain/comment/comment";

class Pagination {
    nextPage: number;
    totalPages: number;
    remainItems: number;

    constructor(
        nextPage: number,
        totalPages: number,
        remainItems: number,
    ){
        this.nextPage = nextPage;
        this.totalPages = totalPages;
        this.remainItems = remainItems;
    }
}

const useViewModel = (postId: string, loadComments: boolean, comment?: Comment, )=>{

    const commentApiPort = useCommentApiPort();
    
    const loadMoreComments= async () => {

        if(pagination && pagination.nextPage > pagination.totalPages){
            return;
        }

        const nextPage = pagination?.nextPage || 1;
        
        const paginationResult =  await commentApiPort.getComments(
            new GetCommentsRequest(
                nextPage, 4, postId, comment?.id
            )
        );

        const currentItems = [...items, ...paginationResult.items];
        
        setPagination(
            new Pagination(
                nextPage+1, 
                paginationResult.pages, 
                paginationResult.totalItems-currentItems.length)
        );
        setItems(currentItems);
    }

    const [pagination, setPagination] = useState<Pagination>();

    const [items, setItems] = useState<Comment[]>([]);

    useEffect(()=>{
        if(loadComments){
            loadMoreComments();
        }
    }, []);

    return {
        items,
        pagination,
        loadMoreComments
    }
}

export default useViewModel;