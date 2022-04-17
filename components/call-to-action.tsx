import Link from 'next/link';

type Props = {
  href: string;
  text: React.ReactNode;
};

const CallToAction: React.FC<Props> = ({ href, text }) => (
  <Link href={href}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a className="cta">{text}</a>
  </Link>
);

export default CallToAction;
