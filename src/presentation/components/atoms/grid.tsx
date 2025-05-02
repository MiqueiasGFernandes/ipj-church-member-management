import React from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export function Grid({
  direction = 'column',
  justifyContent = 'normal',
  width = 100,
  children,
}: {
  direction: FlexDirection,
  justifyContent: string,
  width: number
  children: React.ReactNode
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: direction,
      justifyContent,
      width: `${width}%`, 
    }}
    >
      {children}
    </div>
  );
}