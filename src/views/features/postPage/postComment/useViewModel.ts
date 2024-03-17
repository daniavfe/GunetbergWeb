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

const useViewModel = (postId: string, isFirstNode: boolean, comment?: Comment, )=>{

    const commentApiPort = useCommentApiPort();
    
    const loadMoreComments= async () => {

        if(pagination && pagination.nextPage > pagination.totalPages){
            return;
        }

        const nextPage = pagination?.nextPage || 1;
        
        const paginationResult =  await commentApiPort.getComments(
            new GetCommentsRequest(
                nextPage, 50, postId, comment?.id
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

    const toogleReplySectionVisiblity = ()=>{
        setIsReplySectionVisible(!isReplySectionVisible);
    }

    const toogleAddCommentSectionVisible = ()=>{
        setIsAddCommentSectionVisible(!isAddCommentSectionVisible);
    }

    const [isReplySectionVisible, setIsReplySectionVisible] = useState<boolean>(isFirstNode);

    const [isAddCommentSectionVisible, setIsAddCommentSectionVisible] = useState<boolean>(false);

    const [pagination, setPagination] = useState<Pagination>();

    const [items, setItems] = useState<Comment[]>([]);

    useEffect(()=>{
        if(isFirstNode){
            loadMoreComments();
        }
    }, []);

    useEffect(()=>{
        if(isReplySectionVisible && items.length == 0){
            loadMoreComments();
        }
    }, [isReplySectionVisible]);

    return {
        items,
        pagination,
        isReplySectionVisible,
        isAddCommentSectionVisible,
        toogleReplySectionVisiblity,
        toogleAddCommentSectionVisible,
        loadMoreComments
    }
}

export default useViewModel;