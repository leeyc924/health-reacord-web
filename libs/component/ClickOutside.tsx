import React, { useEffect, useCallback, useRef, ReactNode } from 'react';

interface ClickOutsideProps {
  onClickOutside: (e: MouseEvent) => void;
  tag?: 'div' | 'nav' | 'section' | 'select' | 'option' | 'input' | 'button';
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const ClickOutside = ({ tag = 'div', className, onClickOutside, children, style, ...rest }: ClickOutsideProps) => {
  const Componet = tag;
  const containerRef = useRef<any>();

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClickOutside(e);
      }
    },
    [onClickOutside],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [handleClick]);

  return (
    <Componet ref={containerRef} className={className || ''} style={style} {...rest}>
      {children}
    </Componet>
  );
};

export default ClickOutside;
