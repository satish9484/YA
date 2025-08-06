// Import Swiper React components
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '@/components/common/Card/index.tsx';

import './landing.scss';

const Index = () => {
    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    return (
        <Card>
            <section className="section-1">
                <div className="container h-100 flex-column gap-20 d-flex-center-center">
                    <h1 className="section-1__title">
                        Professional Speaker Manufacturer <br />
                        and Distributor in India
                    </h1>
                    <p className="section-1__description">
                        Best Line Array for Your Best Business & Events
                    </p>
                </div>
            </section>
            <section className="section-2">
                <div className="container container-section-2 h-100 d-flex align-items-center">
                    <div className="sectin-2-left w-50 d-flex flex-column ">
                        <p className="sectin-2-left-p">WHO WE ARE</p>
                        <h2 className="sectin-2-left-h2 ">
                            Our Highest Ambition
                            <br />
                            is to Help People
                        </h2>
                    </div>
                    <div className="sectin-2-right w-50 flex-column justify-content-center gap-35">
                        <h5>
                            Model Box Speaker Line Array - Factory, Suppliers, Manufacturers from
                            India
                        </h5>
                        <p>
                            The client satisfaction is our primary concentrate on. We uphold a
                            consistent level of professionalism, top quality, credibility and
                            service for Model Box Speaker Line Array, Line Array Speakers Oem, Odm
                            Active Speaker, Active Speaker Amplifier,Portable Line Array Speakers.
                            We focus on providing service for our clients as a key element in
                            strengthening our long-term relationships. Our continual availability of
                            high grade products in combination with our excellent pre-sale and
                            after-sales service ensures strong competitiveness in an increasingly
                            globalized market.
                        </p>
                    </div>
                </div>
            </section>
            <section className="section-5">
                <Swiper
                    className="container"
                    modules={[Pagination, Autoplay]}
                    pagination={pagination}
                    loop={true}
                    navigation={true}
                    autoplay={{ delay: 2000, disableOnInteraction: true }}
                    spaceBetween={30}
                    slidesPerView={3}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                >
                    <SwiperSlide>
                        <div className="product-card">
                            <div className="product-card__image-container">
                                {/* Sample Image */}
                                <img
                                    src="https://tse4.mm.bing.net/th/id/OIP.ze6zwZu5ovcPy-6hqgLrZwAAAA?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
                                    alt="Full Range PA Speaker"
                                    className="product-card__image"
                                />
                            </div>
                            <div className="product-card__content">
                                <h3 className="product-card__title">Full Range PA Speaker</h3>
                                <ul className="product-card__features">
                                    <li>
                                        8&quot;, 10&quot;, 12&quot; and dual 15&quot; models
                                        available
                                    </li>
                                    <li>Dual 18&quot; and 21&quot; subwoofers</li>
                                    <li>High-quality plywood cabinet</li>
                                    <li>Custom-made woofers for high output</li>
                                </ul>
                                <a href="#" className="product-card__cta">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="product-card">
                            <div className="product-card__image-container">
                                {/* Sample Image */}
                                <img
                                    src="https://tse1.mm.bing.net/th/id/OIP.ofHTW0BFe4Qju4aQWWOeTwHaHa?cb=thfvnext&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3"
                                    alt="FP Switching Power Amplifier"
                                    className="product-card__image"
                                />
                            </div>
                            <div className="product-card__content">
                                <h3 className="product-card__title">FP Power Amplifier</h3>
                                <ul className="product-card__features">
                                    <li>2-channel and 4-channel series</li>
                                    <li>Stable under 2-ohm long-term drive</li>
                                    <li>650W to 2500W @ 8-ohm per channel</li>
                                    <li>Compact 2U rack design</li>
                                </ul>
                                <a href="#" className="product-card__cta">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="product-card">
                            <div className="product-card__image-container">
                                {/* Sample Image */}
                                <img
                                    src="https://tse1.mm.bing.net/th/id/OIP.xX9Tc2PYtjkoaiGYcxq9ygAAAA?cb=thfvnext&pid=ImgDet&w=184&h=235&c=7&dpr=1.3&o=7&rm=3"
                                    alt="Dual 12 inch Line Array"
                                    className="product-card__image"
                                />
                            </div>
                            <div className="product-card__content">
                                <h3 className="product-card__title">Dual 12&quot; Line Array</h3>
                                <ul className="product-card__features">
                                    <li>High-performance 2-way system</li>
                                    <li>Two 12-inch BEYMA woofers</li>
                                    <li>One 3-inch BEYMA compression driver</li>
                                    <li>900W RMS powerful line array</li>
                                </ul>
                                <a href="#" className="product-card__cta">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="product-card">
                            <div className="product-card__image-container">
                                {/* Sample Image */}
                                <img
                                    src="https://tse1.mm.bing.net/th/id/OIP.Vm-L7e9cr6ba-zN3O_KRawHaHg?cb=thfvnext&pid=ImgDet&w=184&h=186&c=7&dpr=1.3&o=7&rm=3"
                                    alt="Professional DJ Mixer"
                                    className="product-card__image"
                                />
                            </div>
                            <div className="product-card__content">
                                <h3 className="product-card__title">Professional DJ Mixer</h3>
                                <ul className="product-card__features">
                                    <li>4-channel club-style layout</li>
                                    <li>Dedicated sound color FX</li>
                                    <li>14 high-quality beat FX</li>
                                    <li>Durable Magvel fader</li>
                                </ul>
                                <a href="#" className="product-card__cta">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        </Card>
    );
};

export default Index;
