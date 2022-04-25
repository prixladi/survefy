import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import CallToAction from '~components/content/call-to-action';
import ContentImage from '~components/content/content-image';
import ContentPart from '~components/content/content-part';
import Logo from '~components/logo';
import Navbar from '~components/navbar';
import SEO from '~components/seo';

import pages from '~lib/pages';
import session from '~lib/server/session';

import { UserAuthPayload } from '~types';

type PageProps = {
  user: UserAuthPayload;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const user = (await session.getLoginSession(context.req)) as UserAuthPayload;
  return { props: { user } };
};

const Home: NextPage<PageProps> = ({ user }) => {
  const { t: tHome } = useTranslation('t', { keyPrefix: 'home' });

  return (
    <div>
      <SEO title={tHome('title')} />
      <main>
        <Navbar isLoggedIn={!!user} />
        <div className="flex flex-col gap-12 pt-20 md:pt-28 lg:pt-32 prose max-w-full">
          <ContentPart className="flex lg:flex-row flex-1 gap-8 flex-col-reverse">
            <div>
              <div className="font-bold text-5xl">{tHome('firstArticle.title')}</div>
              <p className="text-xl font-normal">{tHome('firstArticle.text')}</p>
              <CallToAction href={pages.auth.signup} text={tHome('firstArticle.ctaRegisterButton')} />
            </div>
            <ContentImage src="/assets/baseImage.png" />
          </ContentPart>

          <ContentPart className="flex flex-col lg:flex-row flex-1 gap-8" bgVariant="bg-gray-900">
            <ContentImage src="/assets/info.png" />
            <div>
              <div>
                <div className="font-bold text-3xl">{tHome('secondArticle.0.title')}</div>
                <p className="text-xl font-normal">{tHome('secondArticle.0.text')}</p>
              </div>
              <div>
                <div className="font-bold text-3xl">{tHome('secondArticle.1.title')}</div>
                <p className="text-xl font-normal">{tHome('secondArticle.1.text')}</p>
              </div>
              <div>
                <div className="font-bold text-3xl">{tHome('secondArticle.2.title')}</div>
                <p className="text-xl font-normal">{tHome('secondArticle.2.text')}</p>
              </div>
            </div>
          </ContentPart>

          <ContentPart className="flex flex-col gap-8">
            <div>
              <div className="font-bold text-3xl">{tHome('thirdArticle.title')}</div>
              <p className="text-xl font-normal">{tHome('thirdArticle.text')}</p>
            </div>
            <ContentImage src="/assets/info.png" />
          </ContentPart>
        </div>
        <footer className="bg-gray-900 flex flex-col justify-center items-center pb-5">
          <Logo />
          <div className="text-white text-sm">© 2022 Survefy, All Rights Reserved.</div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
