import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { $pending } from '../models/app';
import { Plane, StyledLogo } from './Logo.sc';


function Logo() {
  const appPending = useStore($pending);
  const [pending, setPending] = useState(true);
  const ref = useRef<HTMLSpanElement>();

  useEffect(() => {
    const handler = () => setPending(appPending);
    const currentRef = ref.current;

    currentRef?.addEventListener('animationiteration', handler);
    return () => currentRef?.removeEventListener('animationiteration', handler);
  }, [setPending, appPending]);

  return (
    <StyledLogo>
      <Plane ref={ref as any} pending={pending} />
    </StyledLogo>
  );
}

export default Logo;
