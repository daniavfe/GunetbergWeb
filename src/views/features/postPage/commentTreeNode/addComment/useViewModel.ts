import { useState } from "react";
import CreateCommentError from "../../../../../domain/comment/createCommentError";
import ErrorCode from "../../../../../domain/error/errorCode";
import { useCommentBusiness } from "../../../../../config/di/businessModule";
import { useUserContextConsumer } from "../../../../../config/di/contextModule";
import CreateCommentRequest from "../../../../../domain/comment/createCommentRequest";

const useViewModel = (
    postId: string,
    onCommentAdded: (commentId: string) => void,
    commentId?: string,
    onCreationCancelled?: () => void,
) => {
    const userContextConsumer = useUserContextConsumer();
    const commentBusiness = useCommentBusiness();

    const attemptCreateComment = async () => {
        if (!comment) {
            return;
        }

        setIsLoading(true);

        const response = await commentBusiness.attemptCreateComment(
            new CreateCommentRequest(comment, postId, commentId),
        );

        if (response.hasErrors) {
            const errors = response.getErrors();
            setCreateCommentError(
                new CreateCommentError(
                    errors.has(ErrorCode.EmptyComment),
                    errors.has(ErrorCode.EmptyPostId),
                    errors.has(ErrorCode.IncorrectPostId),
                    errors.has(ErrorCode.IncorrectCommentId),
                ),
            );

            setIsLoading(false);
            return;
        }

        onCommentAdded(response.getData());
        cancelCommentCreation();
        return;
    };

    const updateComment = (comment: string) => {
        setComment(comment);
    };

    const showActionButtons = () => {
        setIsActionSectionVisible(true);
    };

    const cancelCommentCreation = () => {
        if (!!onCreationCancelled) {
            onCreationCancelled();
        }
        setComment("");
        setIsActionSectionVisible(false);
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [comment, setComment] = useState<string>();
    const [createCommentError, setCreateCommentError] =
        useState<CreateCommentError>();
    const [isActionSectionVisible, setIsActionSectionVisible] =
        useState<boolean>();

    return {
        userContextConsumer,
        comment,
        isLoading,
        createCommentError,
        isActionSectionVisible,
        attemptCreateComment,
        updateComment,
        showActionButtons,
        cancelCommentCreation,
    };
};

export default useViewModel;
