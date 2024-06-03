import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const Profile = () => {

    const { user } = useContext(AuthContext);
    return (
        <>
            <div className="my-6 lg:ml-80">
                <div className="avatar">
                    <div className="w-60 rounded-full">
                        <img src={user.photoURL} />
                    </div>
                </div>
                <div className="text-left">
                <h1 className="font-medium text-4xl">Name: <span>{user.displayName}</span></h1>
                <h1 className="font-medium text-4xl">Email: <span>{user.email}</span></h1>
            </div>
            </div>
            
        </>
    );
};

export default Profile;