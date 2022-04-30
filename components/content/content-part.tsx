import clsx from 'clsx';
import { useMemo } from 'react';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  bgVariant?: 'bg-gray-900';
};

const ContentPart: React.FC<Props> = ({ children, className, bgVariant }) => {
  const Wrapper: React.FC = useMemo(
    () =>
      bgVariant
        ? ({ children: ch }) => <article className="bg-gray-900 text-white">{ch}</article>
        : ({ children: ch }) => <article className="text-gray-700">{ch}</article>,
    [bgVariant],
  );

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <Wrapper>
      <div className="max-w-4xl m-auto pt-5 px-4">
        <div className={clsx('text-center lg:text-left', className)}>
          {childrenArray.map((ch, index) => (
            <div key={index} className="w-full h-full">
              {ch}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default ContentPart;
