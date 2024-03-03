import { useEffect, useState } from "react";
import CompletePost from "../../../domain/post/completePost";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../../config/di/eventBusModule";
import { useCommentApiPort, usePostApiPort } from "../../../config/di/businessModule";
import NotificationMessage from "../../../domain/notification/notificationMessage";
import { NotificationType } from "../../../domain/notification/notificationType";
import GetCommentsRequest from "../../../domain/comment/getCommentsRequest";
import CreateCommentRequest from "../../../domain/comment/createCommentRequest";

const useViewModel = () => {
    const { title } = useParams();
    const notification = useNotification();
    const navigate = useNavigate();
    const postApiPort = usePostApiPort();
    const commentApiPort = useCommentApiPort()

    const loadPost = async () => {
        if (!title) {
            notification.invoke(
                new NotificationMessage(
                    "Sorry, that post doesn't exist anymore",
                    NotificationType.info,
                ),
            );
            navigate("/");
            return;
        }
        try {
            const result = await postApiPort.getPost(title || "");
            setPost(result);
        } catch {
            notification.invoke(
                new NotificationMessage(
                    "Problem while retrieving the post",
                    NotificationType.info,
                ),
            );
        }
    };

    const loadComments = async (id: string, commentId: string | undefined = undefined) => {
        const comments = await commentApiPort.getComments(
            new GetCommentsRequest(
                1, 10, id, commentId
            )
        );

        console.log(comments);
    }

    const [post, setPost] = useState<CompletePost>();

    useEffect(() => {
        loadPost();
    }, []);

    useEffect(()=>{
        !!post && loadComments(post.id)
    }, [post])

    return {
        post,
    };
};

export default useViewModel;
