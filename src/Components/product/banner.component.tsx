import { IBanner } from "models/banner";
import React, { useEffect, useState } from "react";
import { bannerService } from "services/banner.service";
import Slider, { Settings } from "react-slick";
import { SpinnerComponent } from "components/shared/spinner";
import { Card, Image } from "antd";
import { API_URL_UPLOADS_BANNERS } from "config/constant";
import "./banner.style.scss";

const BannerIndexComponent = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);

  useEffect(() => {
    const getBanners = async () => {
      const banners = await bannerService.list();
      setBanners(banners.data);
      return banners;
    };

    getBanners();
  }, []);
  return (
    <div style={{ margin: "2.5rem 0", padding: "0 2.5rem" }}>
      <Slider {...settings}>
        {banners && banners.length > 0 ? (
          banners.map((b) => {
            return (
              <Card
                bordered={false}
                key={b.id}
                style={{ padding: 0, margin: "0 .5rem" }}
              >
                <div className="banner-card">
                  <Image
                    src={`${API_URL_UPLOADS_BANNERS}/${b.image}`}
                    alt={b.title}
                    style={{ aspectRatio: "1/1", objectFit: 'cover' }}
                    
                  />
                  <div className="banner-caption">{b.subTitle}</div>
                </div>
              </Card>
            );
          })
        ) : (
          <SpinnerComponent height="50vh" message="banners loading..." />
        )}
      </Slider>
    </div>
  );
};

export default BannerIndexComponent;
const settings: Settings = {
  className: "banner-slick",
  infinite: true,
  centerPadding: "60px",
  dots: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 3,
  initialSlide: 0,
  arrows: true,
  lazyLoad: "progressive",
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
