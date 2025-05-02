import React from 'react';
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  ShowButton,
  TextInput,
} from 'react-admin';

import { resume as columns } from '@presentation/constants';
import { isBoolean } from '@domain/validators';


export function ListMembers() {
  return (
    <List
      storeKey={false}
      filter={{ status: 'pending' }}
      filters={
        [
          <TextInput
            key="search"
            label="Pesquisar"
            source="q"
            alwaysOn
            style={{ marginTop: 30, marginBottom: 30 }}
          />,
        ]
      }
    >
      <Datagrid bulkActionButtons={false}>
        {columns.map((item) => (
          <FunctionField
            key={item.source}
            label={item.label}
            source={item.source}
            render={(render) => {
              if (isBoolean(render[item.source])) {
                return item ? 'Sim' : 'Não';
              }
              return render[item.source] || '-';
            }}
          />
        ))}
        <ShowButton label="Exibir" />
        <EditButton label="Editar" />
      </Datagrid>
    </List>
  );
}