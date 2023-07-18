import Author from '../../model/author/author';
import './author.scss'

interface AuthorProps{
    author: Author
}

const AuthorComponent: React.FC<AuthorProps> = ({author})=>{
    return(
        <div id="author" className="author-container">
            <div className="author-image-container">
                <img src={author.photourl ?? "https://cdn.pixabay.com/photo/2019/01/09/14/13/leaves-3923413_1280.jpg"}/>
            </div>
            <div className="author-content-container">
                <h3>{author.alias}</h3>
                <p>{author.description}</p>
            </div>
        </div>
    )
};

export default AuthorComponent;