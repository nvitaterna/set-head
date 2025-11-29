import { Image, ImageProps } from '@mantine/core';
import { FC } from 'react';

type SetheadLogoProps = Omit<ImageProps, 'src' | 'alt'>;

export const SetheadLogo: FC<SetheadLogoProps> = (props) => {
  return <Image src="/icon-512.png" alt="Sethead" {...props} />;
};
