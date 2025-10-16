import { Metadata } from 'next';

export async function generateDynamicMetadata(
  type: string,
  slugId?: string,
): Promise<Metadata> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    let url = `${baseUrl}/api/seo`;

    if (type === 'sec' && slugId) {
      url += `/sector?id=${slugId}`;
    } else if (type === 'auth' && slugId) {
      url += `/authority?id=${slugId}`;
    } else if (type === 'tenderdetails') {
      url += `/tenderDetails?id=${slugId}`;
    } else {
      url += `?type=${type}`;
    }

    const response = await fetch(url, {
      cache: 'no-cache',
      credentials: 'omit',
    });

    if (!response.ok) {
      return {
        title: 'Tenders',
        description:
          'Find the latest government and private tenders, bids, and procurement opportunities in one place. Start bidding today!',
        keywords: [
          'Online News Tender detail',
          ' Online tenders',
          'Latest tenders',
          'govt of tenders',
        ],
      };
    }

    const data = await response.json();

    if (data?.error) {
      return {
        title: 'Tenders',
        description:
          'Find the latest government and private tenders, bids, and procurement opportunities in one place. Start bidding today!',
        keywords: [
          'Online News Tender detail',
          'Online tenders',
          'Latest tenders',
          'govt of tenders',
        ],
      };
    }

    if (type !== 'tenderdetails' && type !== 'sec' && type !== 'auth') {
      const seo_data = data.seoMeta;
      return {
        title: `${seo_data?.page_title}`,
        description:
          `${seo_data.meta_desc}` ||
          'Find the latest government and private tenders, bids, and procurement opportunities in one place. Start bidding today!',
        keywords: `${seo_data.meta_key.split(',').map((item: string) => item.trim())}`,
        alternates: {
          canonical:
            baseUrl +
            (type === 'sectors'
              ? '/tender/sector/' + slugId
              : type === 'Authorities'
                ? '/tender/authority/' + slugId
                : type === 'contact us'
                  ? '/contact'
                  : type === 'home'
                    ? ''
                    : '/' + type),
        },
      };
    } else {
      if (type == 'tenderdetails') {
        return {
          title: `${data?.tnd_title?.slice(0, 60)}`,
          description:
            `${data.tender_details?.slice(0, 150)}` ||
            'Find the latest government and private tenders, bids, and procurement opportunities in one place. Start bidding today!',
          keywords: `${data.seoData?.seoMeta.meta_key
            .split(',')
            .map((item: string) => item.trim())}`,
          alternates: {
            canonical: baseUrl + '/tender/' + data.fld_id,
          },
          openGraph: {
            type: 'website',
            title: data.tnd_title?.slice(0, 60),
            description: data.tender_details?.slice(0, 150),
            url: baseUrl + '/tender/' + data.fld_id,
          },
        };
      } else {
        return {
          title: data?.page_title,
          description: `${data.meta_desc}`,
          keywords: `${data.meta_key
            .split(',')
            .map((item: string) => item.trim())}`,
          alternates: {
            canonical:
              baseUrl +
              `/tender/${type == 'auth' ? 'authority' : 'sector'}/` +
              slugId,
          },
        };
      }
    }
  } catch (error: any) {
    console.error('error', error);
    return {
      title: 'Tenders',
      description:
        'Find the latest government and private tenders, bids, and procurement opportunities in one place. Start bidding today!',
      keywords: [
        'Online News Tender detail',
        ' Online tenders',
        'Latest tenders',
        'govt of tenders',
      ],
    };
  }
}
