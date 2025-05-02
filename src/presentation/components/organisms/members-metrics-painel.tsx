import { Grid } from "@mui/material";
import { MetricCard } from "../molecules";
import { FrequentersIcon, MembersIcon, RequestsPendingIcon } from "@components/atoms";

import { useStyles } from "./styles";


type TotalCounters = {
  totalMembers: number,
  frequenters: number,
  requests: number,
}


export function MembersMetricPainel({ count }: { count: TotalCounters }) {
  const classes = useStyles()

  return <>
    <Grid
      spacing={{ xs: 2, md: 6 }}
      className={classes.container}
      container
      xs={12}
    >
      <MetricCard
        count={count.totalMembers}
        title="Total de Memberos"
        Icon={MembersIcon}
      />
      <MetricCard
        count={count.totalMembers}
        title="Frequentantes"
        Icon={FrequentersIcon}
      />
      <MetricCard
        count={count.totalMembers}
        title="Solicitações"
        Icon={RequestsPendingIcon}
      />
    </Grid>
  </>
}