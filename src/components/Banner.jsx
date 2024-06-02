import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Autoplay } from 'swiper/modules';
import bg1 from '../assets/du.webp';
import bg2 from '../assets/RU.webp';
import bg3 from '../assets/agre.jpg';

const Banner = () => {
    return (
        <>
            <div className="my-8">
                <div>
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
                        parallax={true}
                        modules={[FreeMode, Autoplay]}>
                        <SwiperSlide>
                            <div
                                style={{
                                    backgroundImage: `url(${bg1})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: -1,
                                }}
                                data-swiper-parallax="-23%"
                            ></div>
                            <div className="lg:h-[400px] h-[282px]">
                                <div className="bg-slate-100/50 lg:h-[200px] h-[282px] lg:mx-52 px-10 pt-2">
                                    <div>
                                        <h1 className="text-black font-medium lg:text-4xl text-2xl">Achieve Your Dreams</h1>
                                    </div>
                                    <div>
                                        <h1 className="mt-2 text-black text-xl">
                                            Get recommendations based on your profile and preferences for a more targeted search experience.
                                        </h1>
                                    </div>
                                    <div>
                                        <a className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 my-5" role="button">
                                            Apply Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                style={{
                                    backgroundImage: `url(${bg2})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: -1,
                                }}
                                data-swiper-parallax="-23%"
                            ></div>
                            <div className="lg:h-[400px] h-[282px]">
                                <div className="bg-slate-100/50 lg:h-[200px] h-[282px] lg:mx-52 px-10 pt-2">
                                    <div>
                                        <h1 className="text-black font-medium lg:text-4xl text-2xl">Unlock Your Potential</h1>
                                    </div>
                                    <div>
                                        <h1 className="mt-2 text-black text-xl">
                                            Discover a variety of scholarships that match your academic interests, background, and financial needs.
                                        </h1>
                                    </div>
                                    <div>
                                        <a className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 my-5" role="button">
                                            Apply Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                style={{
                                    backgroundImage: `url(${bg3})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '100%',
                                    width: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: -1,
                                }}
                                data-swiper-parallax="-23%"
                            ></div>
                            <div className="lg:h-[400px] h-[282px]">
                                <div className="bg-slate-100/50 lg:h-[200px] h-[282px] lg:mx-52 px-10 pt-2">
                                    <div>
                                        <h1 className="text-black font-medium lg:text-4xl text-2xl">Invest in Your Future</h1>
                                    </div>
                                    <div>
                                        <h1 className="mt-2 text-black text-xl">
                                            Explore numerous scholarship opportunities to help you finance your college or university education.
                                        </h1>
                                    </div>
                                    <div>
                                        <a className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700 my-5" role="button">
                                            Apply Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default Banner;
