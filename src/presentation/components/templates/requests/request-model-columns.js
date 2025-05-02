import { DateField, TextField } from 'react-admin';

const resume = [
  {
    label: '# ID',
    source: 'id',
    View: TextField,
  },
  {
    label: 'Data de Solicitação',
    source: 'created_at',
    View: DateField,
  },
];

export default resume;
