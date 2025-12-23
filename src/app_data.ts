import Assets from './assets/Assets';

export const ratings_details = [
  {title: 'Bronze Benefits', subtitle: 'Complete profile set up'},
];

export const tipsData = [
  {
    title: 'Complete more jobs',
    description: "The more jobs you finish, the more offers you'll get.",
  },
  {
    title: 'Respond to offers quickly',
    description: 'Fast replies help you appear more reliable to clients.',
  },
  {
    title: 'Avoid last-minute cancellations',
    description: 'Too many cancellations reduce your visibility.',
  },
  {
    title: 'Keep your availability updated',
    description: "This helps clients send offers when you're truly free.",
  },
  {
    title: 'Maintain a high job rating',
    description: 'Good ratings push your profile higher in search results.',
  },
];

export const benefits = {
  bronze: [
    {
      icon: Assets.ProfileEyeActive,
      text: 'Basic profile visibility in category listings',
    },
    {
      icon: Assets.ProfileSuitcaseActive,
      text: 'Eligible to receive job offers',
    },
    {icon: Assets.ProfileSupportActive, text: 'Access to customer support'},
  ],
  silver: [
    {icon: Assets.SilverBadge, text: 'Silver badge on profile'},
    {
      icon: Assets.ProfileSearchInActive,
      text: 'Higher ranking in local search results',
    },
    {
      icon: Assets.ProfileSuitcaseInActive,
      text: 'Priority in job matching for quick jobs',
    },
    {
      icon: Assets.ProfileStartInactive,
      text: "Featured in 'Recommended Pros' sections",
    },
  ],
  gold: [
    {icon: Assets.GoldBadge, text: 'Gold badge on profile'},
    {
      icon: Assets.ProfileSearchInActive,
      text: 'Top suggestion in category searches',
    },
    {
      icon: Assets.ProfileSuitcaseInActive,
      text: 'Priority targeting for premium job requests',
    },
    {
      icon: Assets.ProfileStartInactive,
      text: "Featured on 'Recommended Pros' pages",
    },
  ],
  platinum: [
    {icon: Assets.DiamondBadge, text: 'Titanium badge on profile'},
    {
      icon: Assets.ProfileSearchInActive,
      text: 'Top SEO ranking in category & location',
    },
    {
      icon: Assets.ProfileSuitcaseInActive,
      text: 'First access to high-paying or urgent jobs',
    },
    {icon: Assets.ProfileStartInactive, text: "Featured on 'Top rated' pages"},
    {
      icon: Assets.ProfileSupportActive,
      text: 'Priority support & dispute resolution',
    },
  ],
};

export const tierInfo: {
  [x: string]: {
    title: string;
    level: string;
    nextTier?: string;
    jobsRequired: number;
    ratingRequired: number;
  };
} = {
  bronze: {
    title: 'Bronze Rated',
    level: 'Starter level',
    nextTier: 'Silver',
    jobsRequired: 15,
    ratingRequired: 4,
  },
  silver: {
    title: 'Silver Rated',
    level: 'Skilled level',
    nextTier: 'Gold',
    jobsRequired: 50,
    ratingRequired: 4,
  },
  gold: {
    title: 'Gold Rated',
    level: 'Experienced level',
    nextTier: 'Platinum',
    jobsRequired: 200,
    ratingRequired: 4,
  },
  platinum: {
    title: 'Platinum Rated',
    level: 'Elite level',
    jobsRequired: 200,
    ratingRequired: 4,
  },
};
