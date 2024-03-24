import { useEffect, useState } from "react";
import Comment from "../../../../domain/comment/comment";
import { useCommentBusiness } from "../../../../config/di/businessModule";
import GetCommentsRequest from "../../../../domain/comment/getCommentsRequest";
import { useUserContextConsumer } from "../../../../config/di/contextModule";
import GetCommentRequest from "../../../../domain/comment/getCommentRequest";

class CommentPagination {
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

const useViewModel = (postId: string, comment?:Comment)=>{

    const userContextConsumer = useUserContextConsumer();
    const commentBusiness = useCommentBusiness();
    
    const loadComments = async ()=>{
        
        if(pagination && pagination.nextPage > pagination.totalPages){
            return;
        }

        setIsLoading(true);

        const nextPage = pagination?.nextPage || 1;
        
        const result = await commentBusiness.getComments(new GetCommentsRequest(nextPage, 5, postId, comment?.id));

        const currentItems = [...items, ...result.items];
        const remainItems = result.totalItems - currentItems.length;
        
        setPagination(
            new CommentPagination(
                nextPage+1, 
                result.pages, 
                remainItems
            )
        );
        setItems(currentItems);
        setIsLoading(false);
    }

    const toggleReplySectionVisibility = ()=>{
        setIsReplySectionVisible(!isReplySectionVisible);
        if(!pagination){
            loadComments();
        }
    }

    const toggleCommentSectionVisibility = ()=>{
        setIsCommentSectionVisible(!isCommentSectionVisible);

    }

    const includeNewComment = async (commentId: string)=>{
        
        if(!isReplySectionVisible){
            toggleReplySectionVisibility();
        }

        const result = await commentBusiness.getComment(new GetCommentRequest(postId, commentId));
        setItems([result, ...items]);
        setIsReplySectionVisible(true);
        

        if(!!comment){
            comment.numberOfReplies = comment.numberOfReplies + 1;
        }

    }

    const [isReplySectionVisible, setIsReplySectionVisible] = useState<boolean>(false);
    const [isCommentSectionVisible, setIsCommentSectionVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<CommentPagination>();
    const [items, setItems] = useState<Comment[]>([]);

    useEffect(()=>{
        if(!comment){
            loadComments();
        }
    }, []);
    
    return {
        userContextConsumer,
        isLoading,
        isReplySectionVisible,
        isCommentSectionVisible,
        items,
        pagination,
        toggleReplySectionVisibility,
        toggleCommentSectionVisibility,
        loadComments,
        includeNewComment
    };
};

export default useViewModel;


