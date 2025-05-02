import { v4 } from 'uuid';

import { Close, Done } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  Button,
  Confirm,
  FunctionField,
  Show,
  SimpleShowLayout,
  useNotify,
  useRecordContext,
  useRedirect,
  useUpdate,
} from 'react-admin';
import { full as columns } from '@presentation/constants';

function ConfirmDialogs({ dialogOpen, setDialogOpen }) {
  const notify = useNotify();
  const record = useRecordContext();

  const redirect = useRedirect();
  const [update] = useUpdate();

  const handleConfirm = () => {
    update('requests', { id: record.id, data: { status: 'approved', memberDocumentId: v4().slice(0, 4).toUpperCase() } })
      .catch(() => {
        notify('Ocorreu um erro interno ao aprovar o registro');
      })
      .then(() => {
        notify('Solicitação aprovada com êxito');
        redirect('/requests');
      });
  };

  const handleRejected = () => {
    update('requests', { id: record.id, data: { status: 'rejected' } })
      .catch(() => {
        notify('Ocorreu um erro interno ao rejeitar o registro');
      })
      .then(() => {
        notify('Solicitação rejeitada com êxito');
        redirect('/requests');
      });
  };

  return (
    <>
      <Confirm
        isOpen={dialogOpen.APPROVE}
        title="Aprovar solicitação"
        content="Deseja aprovar a solicitação?"
        cancel="Cancelar"
        onConfirm={handleConfirm}
        onClose={() => setDialogOpen({ ...dialogOpen, APPROVE: false })}
      />
      <Confirm
        isOpen={dialogOpen.REJECT}
        title="Rejeitar solicitação"
        content="Deseja rejeitar a solicitação?"
        cancel="Cancelar"
        onConfirm={handleRejected}
        onClose={() => setDialogOpen({ ...dialogOpen, REJECT: false })}
      />
    </>

  );
}

export default function ShowRequest() {
  const [openDialog, setOpenDialog] = useState({
    APPROVE: false,
    REJECT: false,
  });

  return (
    <>
      <Show>
        <ConfirmDialogs dialogOpen={openDialog} setDialogOpen={setOpenDialog} />
        <SimpleShowLayout>
          <Typography fontSize={32}>Dados da Solicitação</Typography>
          {requestColumns.map((item) => React.createElement(item.View, {
            label: item.label,
            source: item.source,
          }))}
          <Grid xs={12} justifyItems="start">
            <Button
              color="success"
              startIcon={<Done />}
              variant="contained"
              label="Aprovar"
              style={{
                marginRight: 5,
              }}
              onClick={() => setOpenDialog({ ...openDialog, APPROVE: true })}
            />
            <Button
              color="error"
              startIcon={<Close />}
              variant="contained"
              label="rejeitar"
              onClick={() => setOpenDialog({ ...openDialog, REJECT: true })}
            >
              Rejeitar
            </Button>
          </Grid>
        </SimpleShowLayout>
      </Show>
      <Show title=" " style={{ paddingBottom: 10 }}>
        <SimpleShowLayout>
          {columns
            .filter((item) => item.source !== 'memberDocumentId')
            .map((item) => (
              <FunctionField
                key={item.label}
                label={item.label}
                source={item.source}
                render={({ member: render }) => {
                  if (isBoolean(render[item.source])) {
                    return item ? 'Sim' : 'Não';
                  }

                  if (isEmail(render[item.source])) {
                    return <a title={`Enviar email para: ${render[item.source]}`} href={`mailto:${render[item.source]}`}>{render[item.source]}</a>;
                  }
                  return render[item.source] || '-';
                }}
              />
            ))}
        </SimpleShowLayout>
      </Show>
    </>
  );
}
