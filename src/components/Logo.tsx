import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@carex/react';
import { keyframes, styled } from '../stitches.config';
import { pending$ } from '../models/app';
import LogoUrl from '../assets/images/Logo.svg';
import PlaneUrl from '../assets/images/Plane.svg';


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
    <Container>
      <Plane ref={ref} running={pending} />
    </Container>
  );
}


const rotate = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

const Container = styled('span', {
  width: 60,
  height: 60,
  display: 'inline-block',
  backgroundSize: 'contain',
  background: `url("${LogoUrl}") no-repeat center center`,
});


const Plane = styled('span', {
  width: 30,
  height: 30,
  position: 'relative',
  top: 15,
  left: 15,
  display: 'inline-block',
  backgroundSize: 'contain',
  background: `url("${PlaneUrl}") no-repeat center center`,
  webkitBackfaceVisibility: 'hidden',
  animation: `${rotate} 1.2s ease-in-out infinite`,
  animationPlayState: 'paused',

  variants: {
    running: {
      true: {
        animationPlayState: 'running',
      },
    },
  },
});

Logo.Container = Container;
Logo.Plane = Plane;

export default Logo;
