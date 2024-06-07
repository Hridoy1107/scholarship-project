import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Autoplay } from 'swiper/modules';
import bg1 from '../assets/2011828.jpg';
import bg2 from '../assets/36-beautiful-college-campuses.jpg';
import bg3 from '../assets/64aa0f7948f6f0fdea44af9b4b761e37.jpg';
import bg4 from '../assets/OIP.jpg';
import bg5 from '../assets/R.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <>
            <div className="mt-8">
                <div className="lg:flex">
                    <div className="lg:w-[688px]">
                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            freeMode={true}
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            modules={[FreeMode, Autoplay]}
                        >
                            <SwiperSlide><img className="lg:w-[688px] w-full lg:h-[316px] h-[204px] rounded-2xl" src={bg1} /></SwiperSlide>
                            <SwiperSlide><img className="lg:w-[688px] w-full lg:h-[316px] h-[204px] rounded-2xl" src={bg2} /></SwiperSlide>
                            <SwiperSlide><img className="lg:w-[688px] w-full lg:h-[316px] h-[204px] rounded-2xl" src={bg3} /></SwiperSlide>
                            <SwiperSlide><img className="lg:w-[688px] w-full lg:h-[316px] h-[204px] rounded-2xl" src={bg4} /></SwiperSlide>
                            <SwiperSlide><img className="lg:w-[688px] w-full lg:h-[316px] h-[204px] rounded-2xl" src={bg5} /></SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="lg:w-[680px] lg:ml-2 lg:mt-0 mt-4">
                        <Swiper
                            slidesPerView={1}
                            loop={true}
                            freeMode={true}
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            modules={[FreeMode, Autoplay]}
                        >
                            <SwiperSlide>
                                <div className="lg:py-20 ">
                                    <div>
                                        <h1 className="font-medium lg:text-4xl text-2xl">Achieve Your Dreams</h1>
                                    </div>
                                    <div>
                                        <h1 className="mt-2 text-xl">
                                            Get recommendations based on your profile and preferences for a more targeted search experience.
                                        </h1>
                                    </div>
                                    <div>
                                        <Link to="/all-scholarships" className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 my-5" role="button">
                                            Apply Now
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="lg:py-20 ">
                                    <div>
                                        <h1 className="font-medium lg:text-4xl text-2xl">Unlock Your Potential</h1>
                                    </div>
                                    <div>
                                        <h1 className="mt-2 text-xl">
                                            Discover a variety of scholarships that match your academic interests, background, and financial needs.
                                        </h1>
                                    </div>
                                    <div>
                                        <Link to="/all-scholarships" className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 my-5" role="button">
                                            Apply Now
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="lg:py-20 ">
                                    <div>
                                        <h1 className=" font-medium lg:text-4xl text-2xl">Invest in Your Future</h1>
                                    </div>
                                    <div>
                                        <h1 className="mt-2 text-xl">
                                            Explore numerous scholarship opportunities to help you finance your college or university education.
                                        </h1>
                                    </div>
                                    <div>
                                        <Link to="/all-scholarships" className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 my-5" role="button">
                                            Apply Now
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="lg:py-20 ">
                                    <div>
                                        <h1 className="font-medium lg:text-4xl text-2xl">Secure Your Education with Scholarships</h1>
                                    </div>
                                    <div>
                                        <h1 className="mt-2 text-xl">
                                            Access exclusive resources and expert guidance to optimize your scholarship applications and funding opportunities.
                                        </h1>
                                    </div>
                                    <div>
                                        <Link to="/all-scholarships" className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 my-5" role="button">
                                            Apply Now
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="lg:py-20 ">
                                    <div>
                                        <h1 className="font-medium lg:text-4xl text-2xl">Empower Your Future with Financial Aid</h1>
                                    </div>
                                    <div>
                                        <h1 className="mt-2 text-xl">
                                            Navigate through a variety of scholarships and grants designed to make your college journey affordable and attainable.
                                        </h1>
                                    </div>
                                    <div>
                                        <Link to="/all-scholarships" className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 my-5" role="button">
                                            Apply Now
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
