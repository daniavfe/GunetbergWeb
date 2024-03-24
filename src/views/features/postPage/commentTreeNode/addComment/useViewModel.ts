import { useState } from "react";
import CreateCommentError from "../../../../../domain/comment/createCommentError";
import ErrorCode from "../../../../../domain/error/errorCode";
import { useCommentBusiness } from "../../../../../config/di/businessModule";
import { useUserContextConsumer } from "../../../../../config/di/contextModule";
import CreateCommentRequest from "../../../../../domain/comment/createCommentRequest";

const useViewModel = (
    postId: string,
    onCommentAdded: (commentId: string)=>void,
    commentId?:string,
    onCreationCancelled?: ()=>void,
    )=>{

    const userContextConsumer = useUserContextConsumer();
    const commentBusiness = useCommentBusiness();


    const attemptCreateComment = async ()=>{
        if(!comment){
            return;
        }

        setIsLoading(true);
        
        const creationAttempt = await commentBusiness.attemptCreateComment(new CreateCommentRequest(comment, postId, commentId));

        if (!!creationAttempt[0]) {
            onCommentAdded(creationAttempt[0]);
            cancelCommentCreation();
            return;
        }

        if (!!creationAttempt[1]) {
            setCreateCommentError(
                new CreateCommentError(
                    creationAttempt[1].has(ErrorCode.EmptyComment),
                    creationAttempt[1].has(ErrorCode.EmptyPostId),
                    creationAttempt[1].has(ErrorCode.IncorrectPostId),
                    creationAttempt[1].has(ErrorCode.IncorrectCommentId),
                ),
            );

            setIsLoading(false);
            return;
        }

        console.log("Something horrible has happened");
    }

    const updateComment  = (comment: string)=>{
        setComment(comment);
    }
    
    const showActionButtons = ()=>{
        setIsActionSectionVisible(true);
    }


    const cancelCommentCreation = ()=>{
        if(!!onCreationCancelled){
            onCreationCancelled(); 
        }
        setComment("");
        setIsActionSectionVisible(false);
    }


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [comment, setComment] = useState<string>();
    const [createCommentError, setCreateCommentError] = useState<CreateCommentError>();
    const [isActionSectionVisible, setIsActionSectionVisible] = useState<boolean>();
 
    return {
        userContextConsumer,
        comment,
        isLoading,
        createCommentError,
        isActionSectionVisible,
        attemptCreateComment,
        updateComment,
        showActionButtons,
        cancelCommentCreation
    };
};

export default useViewModel;