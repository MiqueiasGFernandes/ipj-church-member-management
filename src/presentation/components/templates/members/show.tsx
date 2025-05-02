import { isBoolean, isEmail } from '@domain/validators';
import { full as columns } from '@presentation/constants';
import React from 'react';
import { FunctionField, Show, SimpleShowLayout } from 'react-admin';
export function ShowMember() {
  return (
    <Show>
      <SimpleShowLayout>
        {columns.map((item) => (
          <FunctionField
            key={item.label}
            label={item.label}
            source={item.source}
            render={(render) => {
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
  );
}
