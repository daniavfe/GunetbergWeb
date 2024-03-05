import useViewModel from "./useViewModel";
import "./style.css";

const Profile = ()=>{

    const viewmodel = useViewModel();

    return(
        <section id="profile-page" className="profile-page">
            {
                !viewmodel.isLoading && !viewmodel.user &&
                <div id="profile-not-found" className="profile-not-found">
                    It looks like the user you are looking for doesn't exist anymore.
                </div>
            }
            {
                !viewmodel.isLoading && !!viewmodel.user &&
                <div id="profile-user" className="profile-user">
                    <img className="profile-user-image" src={viewmodel.user?.photoUrl || ""}/>
                    <h3>{viewmodel.user?.alias}</h3>
                    <p>{viewmodel.user?.description}</p>
                    <div id="profile-actions" className="profile-actions">
                        <button className="main-button ">Edit profile</button>
                    </div>
                </div>
            }
            {
                viewmodel.isLoading &&
                <div id="profile-loading" className="profile-loading">
                    Loading
                </div>
            }
           
        </section>
    );
}

export default Profile;