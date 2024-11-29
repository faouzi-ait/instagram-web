import React, { Suspense } from 'react';

import styles from './imageWithLoader.module.css';

const LazyImage = React.lazy(() => import('next/image'));

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  sizes = 'auto',
  priority = false,
  fill = false,
  className,
}) => {
  return (
    <div className={`${styles.imageWrapper} ${className || ''}`}>
      <div className={styles.loaderContainer}>
        <Suspense fallback={<div className={styles.loader}></div>}>
          <LazyImage
            sizes={sizes}
            alt={alt}
            src={src}
            priority={priority}
            fill={fill}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default ImageWithLoader;
