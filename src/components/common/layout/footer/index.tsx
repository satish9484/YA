import { Layout } from 'antd';

import './footer.scss';

const { Footer } = Layout;

const PageFooter = () => {
    return (
        <Footer>
            <div className="footer-part-1 w-100 d-flex-center-center">
                <div className="container d-flex ">
                    <div className='d-flex flex-column align-items-start gap-20'>
                        <figure className="footer-img">
                            <img src="./logo/YA-logo.PNG" />
                        </figure>
                        <h3>
                            Have other questions? <br />
                            Email Us At <br />
                            <span>outburst@auduio.com.au</span>
                        </h3>
                    </div>

                    <div className="footer-links w-100 d-flex gap-60">
                        <div className="footer-menu w-100 d-flex justify-content-between flex-wrap gap-20 justify-between">
                            <div className="d-flex flex-column gap-40">
                                <h2 className="footer-heading-font footer-menu-left">MENU</h2>
                                <div className="d-flex flex-column align-content-between  flex-wrap footer-menu-left gap-20">
                                    <a href="" className="menu-links">
                                        Line Array
                                    </a>
                                    <a href="" className="menu-links">
                                        Professional Speaker
                                    </a>
                                    <a href="" className="menu-links">
                                        Stage Monitor
                                    </a>
                                    <a href="" className="menu-links">
                                        Packaging and Spipping
                                    </a>
                                    <a href="" className="menu-links">
                                        About
                                    </a>
                                    <a href="" className="menu-links">
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex flex-column  gap-40">
                                <h2 className="footer-heading-font footer-menu-left">Support</h2>
                                <div className="d-flex flex-column  footer-menu-left  gap-20 ">
                                    <a href="" className="menu-links mr-r-33">
                                        Terms of Use
                                    </a>
                                    <a href="" className="menu-links mr-r-53">
                                        FAQ’s
                                    </a>
                                    <a href="" className="menu-links ">
                                        Privacy policy
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-40 ">
                                <h2 className="footer-heading-font footer-menu-right">SOCIAL</h2>
                                <div className="d-flex-center-center flex-column gap-20 footer-menu-right">
                                    <figure className="footer-social-img-1">
                                        <img src="./images/footer_facebook.png" />
                                    </figure>
                                    <figure className="footer-social-img-2">
                                        <img src="./images/footer_twitter.png" />
                                    </figure>
                                    <figure className="footer-social-img-3">
                                        <img src="./images/footer_instagram.png" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="footer-part-2 w-100 d-flex-center-center">© Copyright</p>

            {/* <div className=" md-container d-flex justify-evenly">
                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <img src="./images/footer_home.png" />
                    </figure>
                    <p className="md-fig-p">Home</p>
                </div>

                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <img src="./images/footer-community.png" />
                    </figure>
                    <p className="md-fig-p">Home</p>
                </div>

                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <img src="./images/footer_chat.png" />
                    </figure>
                    <p className="md-fig-p">Home</p>
                </div>

                <div className="d-flex-column-center">
                    <figure className="md-fig-1">
                        <img src="./images/footer_post.png" />
                    </figure>
                    <p className="md-fig-p">Home</p>
                </div>

                <div className=" d-flex-column-center">
                    <figure className="md-fig-1">
                        <img src="./images/footer_profile.png" />
                    </figure>
                    <p className="md-fig-p">Home</p>
                </div>
            </div> */}
        </Footer>
    );
};

export default PageFooter;
