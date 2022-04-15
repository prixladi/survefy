import React from 'react';

type Props = {
  src: string;
};

const ContentImage: React.FC<Props> = ({ src }) => (
  <img src={src} className="object-cover mt-0 rounded-md shadow-lg" />
);

export default ContentImage;
