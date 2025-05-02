import { Card, CardContent, CardHeader, Grid, Icon, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";

export function MetricCard({ count, title }: { count: number, title: string, Icon: React.ElementType }) {

  const classes = useStyles();

  return <Grid
    spacing={{ xs: 2, md: 6 }}
    className={classes.container}
    container
    xs={12}
  >
    <Grid item xs={12} md={4}>
      <Card
        variant="elevation"
        className={`${classes.indicator_card}`}
      >
        <Icon>
          <CardContent>
            <Typography fontSize={64} fontWeight="bold">
              {count}
            </Typography>
          </CardContent>
          <CardHeader title={title} />
        </Icon>
      </Card>
    </Grid>
  </Grid>
}