import { Avatar, Card, styled } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

import React, { useEffect, useRef } from "react";

export function BackgroudImageContainer(props: { backgroundImage: string, children: React.ReactNode }) {
  const { backgroundImage, children, ...restProps } = props;

  const PREFIX = 'RaLogin';
  const LoginClasses = {
    card: `${PREFIX}-card`,
    avatar: `${PREFIX}-avatar`,
    icon: `${PREFIX}-icon`,
  };

  const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (_props, styles) => styles.root,
  })(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage:
      'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',

    [`& .${LoginClasses.card}`]: {
      minWidth: 300,
      marginTop: '6em',
    },
    [`& .${LoginClasses.avatar}`]: {
      margin: '1em',
      display: 'flex',
      justifyContent: 'center',
    },
    [`& .${LoginClasses.icon}`]: {
      backgroundColor: theme.palette.secondary.main,
    },
  }));

  const containerRef = useRef<HTMLDivElement>(null);
  let backgroundImageLoaded = false;

  const updateBackgroundImage = () => {
    if (!backgroundImageLoaded && containerRef.current) {
      containerRef.current.style.backgroundImage = `url(${backgroundImage})`;
      backgroundImageLoaded = true;
    }
  };

  const lazyLoadBackgroundImage = () => {
    if (backgroundImage) {
      const img = new Image();
      img.onload = updateBackgroundImage;
      img.src = backgroundImage;
    }
  };

  useEffect(() => {
    if (!backgroundImageLoaded) {
      lazyLoadBackgroundImage();
    }
  });

  return <Root {...restProps} ref={containerRef}>
    <Card className={LoginClasses.card}>
      <div className={LoginClasses.avatar}>
        <Avatar className={LoginClasses.icon}>
          <LockIcon />
        </Avatar>
      </div>
      {children}
      <div style={{
        padding: '0px 20px 20px',
      }}
      />
    </Card>
  </Root>
}