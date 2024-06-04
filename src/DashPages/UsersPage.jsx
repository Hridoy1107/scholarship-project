import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";



const UsersPage = () => {
    const axiosPublic = useAxiosPublic();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/users/${user._id}`, { role: 'admin' })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'Success!',
                                text: `${user.name} is an Admin Now!`,
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            });
                        }
                    })
            }
        });
    };


    const handleMakeMod = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/users/${user._id}`, { role: 'moderator' })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'Success!',
                                text: `${user.name} is a Moderator Now!`,
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            });
                        }
                    })
            }
        });
    };


    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const [filter, setFilter] = useState('all');
    const filteredUsers = users.filter(user => {
        if (filter === 'all') return true;
        if (filter === 'user') return !user.role || user.role === 'user'; // Show users with no role or role 'user'
        return user.role === filter;
    });

    if (isLoading) {
        return (
            <div className="my-4"><span className="loading loading-spinner loading-lg"></span></div>
        );
    }

    return (
        <div>
            <h1 className="mt-2 font-semibold text-xl lg:text-3xl">All Users to manage</h1>
            <div className="lg:flex lg:justify-evenly lg:px-80 my-4 gap-2">
                <button onClick={() => setFilter('user')} className="btn btn-accent">Show Only Users</button>
                <button onClick={() => setFilter('admin')} className="btn btn-primary">Show Only Admins</button>
                <button onClick={() => setFilter('moderator')} className="btn btn-success">Show Only Moderators</button>
                <button onClick={() => setFilter('all')} className="btn btn-secondary">Show All</button>
            </div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">Total Users: {filteredUsers.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td><span className="font-bold">{user.name}</span></td>
                                    <td><span className="font-semibold">{user.email}</span></td>
                                    <td className="font-medium">
                                        {user.role === 'admin' ? 'Admin' : user.role === 'moderator' ? 'Moderator' : 'User'}
                                    </td>
                                    <td className="font-medium">
                                        {user.role === 'admin' || user.role === 'moderator' ? 'Has a Role' : (
                                            <>
                                                <div>
                                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-warning">Make Admin</button>
                                                    <button onClick={() => handleMakeMod(user)} className="btn btn-accent ml-4">Make Moderator</button>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-error">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;