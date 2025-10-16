export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'IREPS Tender',
  description:
    'Find the latest government and private tenders, bids, and procurement opportunities in one place. Start bidding today!',
  navItems: [
    {
      label: 'Tenders',
      href: '/tender',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact us',
      href: '/contact',
    },
  ],
  navMenuItems: [
    {
      label: 'Tenders',
      href: '/tender',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact us',
      href: '/contact',
    },
  ],
  sortBy: [
    { lable: 'Tender Value', key: 'value' },
    { lable: 'EMD Value', key: 'emd_value' },
    { lable: 'Deadline', key: 'deadline' },
    { lable: 'Published Date', key: 'publish_date' },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
