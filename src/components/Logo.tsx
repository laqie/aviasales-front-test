import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@carex/react';
import { pending$ } from '../models/app';
import { Plane, StyledLogo } from './Logo.sc';


function Logo() {
  const appPending = useStore(pending$);
  const [pending, setPending] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handler = () => setPending(appPending);
    const currentRef = ref.current;

    currentRef?.addEventListener('animationiteration', handler);
    return () => currentRef?.removeEventListener('animationiteration', handler);
  }, [appPending]);

  return (
    <StyledLogo>
      <Plane ref={ref} className={pending ? 'running' : undefined} />
    </StyledLogo>
  );
}

export default Logo;
