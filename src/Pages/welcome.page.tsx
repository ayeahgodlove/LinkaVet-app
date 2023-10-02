import { HomeBanner } from "components/home-banner/home-banner.component";
import BuyInThreeSteps from "components/buy-in-three-steps/buy-in-three-steps.component";
import Review from "components/review/review.component";
import Subscribe from "components/subscribe/subscribe.component";
import { WhyHoneyMan } from "components/why-honeyman/why-honeyman.component";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";

const WelcomePage: React.FC = () => {
  return (
    <GeneralAppShell>
      {/* Banner */}
      <HomeBanner />

      {/* startup in 3 steps */}
      <BuyInThreeSteps />

      {/* subscribe */}
      <Subscribe />

      {/* Why */}
      <WhyHoneyMan />
      {/* reviews */}
      <Review />

      {/* product list */}
    </GeneralAppShell>
  );
};

export default WelcomePage;
