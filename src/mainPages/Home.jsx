import HomeReviews from "../DashPages/HomeReviews";
import Banner from "../components/Banner";
import Top from "../components/Top";
import HomeCard from "../components/HomeCard";
import Contact from "../components/Contact";


const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Top></Top>
            <HomeReviews></HomeReviews>
            <Contact></Contact>
            <HomeCard></HomeCard>
        </>
    );
};

export default Home;