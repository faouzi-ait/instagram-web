import React, { CSSProperties, Suspense } from 'react';
import iconMap from './iconMap';

export type IconKey = keyof typeof iconMap;

export interface IconProps {
  name: IconKey;
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  testId?: string;
  label?: string;
}

export default function Icon({
  name,
  size = 24,
  color = 'currentColor',
  style: customStyle,
  className,
  onClick,
  testId,
  label,
}: IconProps) {
  const iconFileName = iconMap[name];
  const IconSvg = React.useMemo(
    () => React.lazy(() => import(`./svgs/${iconFileName}`)),
    [iconFileName]
  );

  if (!iconFileName) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <figure
          style={{ width: size, height: size }}
          data-testid={testId}
          aria-label={label || 'Loading icon'}
        ></figure>
      }
    >
      <button
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          height: size,
          background: 'none',
          border: 'none',
          padding: 0,
          color,
          ...customStyle,
        }}
        className={className}
        onClick={onClick}
        aria-label={label || name}
        data-testid={testId}
        type='button'
      >
        <IconSvg />
      </button>
    </Suspense>
  );
}
