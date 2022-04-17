import Link from 'next/link';

type Props = {
  href: string;
  text: string;
};

const PageMove: React.FC<Props> = ({ href, text }) => (
  <Link href={href}>
    <a className="inline-block align-baseline font-bold text-md text-amber-900 hover:no-underline">
      {text}
    </a>
  </Link>
);

export default PageMove;
