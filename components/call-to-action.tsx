import Link from 'next/link';

type Props = {
  href: string;
  text: React.ReactNode;
};

const CallToAction: React.FC<Props> = ({ href, text }) => (
  <Link href={href}>
  {/* eslint-disable-next-line */}
    <a className="cta">{text}</a>
  </Link>
);

export default CallToAction;
