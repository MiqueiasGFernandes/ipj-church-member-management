import React from 'react';
import { Typography, Divider } from '@mui/material';


type SectionTitleProps = {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <>
      <Typography variant="h5" component="h2" style={{ marginTop: 20, marginBottom: 10 }}>
        {children}
      </Typography>
      <Divider style={{ marginBottom: 40 }} />
    </>
  );
}