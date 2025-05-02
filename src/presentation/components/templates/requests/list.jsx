import React from 'react';
import {
  Datagrid,
  List,
  ShowButton,
} from 'react-admin';

import columns from './request-model-columns';

function ListRequests() {
  return (
    <List
      filter={{
        status: 'pending',
      }}
      exporter={false}
    >
      <Datagrid bulkActionButtons={false}>
        {columns.map((item) => React.createElement(item.View, {
          source: item.source,
          label: item.label,
        }))}
        <ShowButton label="Exibir" />
      </Datagrid>
    </List>
  );
}

export default ListRequests;
