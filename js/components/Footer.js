import React from 'react';

export const Footer = () => {
  var badgeUrl = 'https://play.google.com/store/apps/details?id=com.fnp.showman&utm_source=' +
    'global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=' +
    'MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1';

  return (
    <footer>
      <div>
        <p className="caption"><span>Showman</span>: The superhero app!</p>
        <p className="caption">Track and organize your favourite TV Shows</p>
      </div>
      <a href={badgeUrl}>
        <img alt='Get it on Google Play' height="100"
             src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"/>
      </a>
      <p className="caption show-on-small-and-down">
        Data and images from Trakt.tv: <a href="https://trakt.tv/terms">Terms and
        conditions</a>
      </p>
    </footer>
  )
};