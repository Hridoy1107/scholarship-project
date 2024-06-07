import PropTypes from 'prop-types';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../provider/AuthProvider';
import { useContext } from 'react';
import ErrorPage from '../components/ErrorPage';

const ModminRoute = ({ children }) => {

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        }
    })

    if (isLoading) {
        return (
            <div className="my-4"><span className="loading loading-spinner loading-lg"></span></div>
        );
    }

    const currentUser = users.find(u => u.email === user?.email);

    if (currentUser?.role === 'admin' || currentUser?.role === 'moderator') {
        return children;
    }

    return (
        <ErrorPage></ErrorPage>
    );
};

export default ModminRoute;

ModminRoute.propTypes = {
    children: PropTypes.node
}