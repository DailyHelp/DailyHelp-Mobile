import React from 'react';
import Assets from '../assets/Assets';
import {scale} from '../shared/Scaling';

const Badge: IBadge = ({size = 16, tier, data, style}) => {
  let BadgeIcon = Assets.BronzeBadge;

  const badgeType = tier || data?.badge;

  if (badgeType === 'diamond') BadgeIcon = Assets.DiamondBadge;
  if (badgeType === 'gold') BadgeIcon = Assets.GoldBadge;
  if (badgeType === 'silver') BadgeIcon = Assets.SilverBadge;
  if (badgeType === 'bronze') BadgeIcon = Assets.BronzeBadge;

  return <BadgeIcon width={scale(size)} height={scale(size)} style={style} />;
};

export default React.memo(Badge);
