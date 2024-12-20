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
}

export default function Icon({
  name,
  size = 24,
  color = 'currentColor',
  style: customStyle,
  className,
  onClick,
  testId,
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
        <div style={{ width: size, height: size }} data-testid={testId}></div>
      }
    >
      <span
        style={
          {
            display: 'inline-block',
            width: size + 'px',
            height: size + 'px',
            cursor: 'pointer',
            color,
            ...customStyle,
          } as unknown as CSSProperties
        }
        className={className}
        onClick={onClick}
      >
        <IconSvg />
      </span>
    </Suspense>
  );
}
