import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Profile = () => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <>
            <div className="mt-10">
                <div className="avatar">
                    <div className="w-60 rounded-full">
                        <img src={user.photoURL} />
                    </div>
                </div>
            </div>
            <div>
                <h1 className="font-medium text-4xl">Name: <span className="text-emerald-500">{user.displayName}</span></h1>
                <h1 className="font-medium text-4xl">Email: <span className="text-emerald-500">{user.email}</span></h1>
                <div>
                    {
                        users.map((user2) => (
                            <h1 key={user2._id} className="font-medium text-4xl">Role: <span className="text-emerald-500">{user2.role === 'admin' ? 'Admin' : user2.role === 'moderator' ? 'Moderator' : 'User'}</span></h1>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Profile;