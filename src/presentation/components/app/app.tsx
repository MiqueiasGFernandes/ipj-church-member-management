import {
  Admin,
  CustomRoutes,
  Resource,
} from 'react-admin';

import { People, Update } from '@mui/icons-material';
import { i18nProvider } from '@services/translation';
import { Route } from 'react-router-dom';

import SignupMember from '../member-signup/member-signup-view';

import { Dashboard } from '@components/pages';
import { CreateMember, EditMember, ListMembers, ShowMember } from '@components/templates';
import { RemoteAuthProvider } from '@services/auth-provider';
import { RemoteStorageDataProvider } from '@services/data-provider';
import resources from '../../config/resources';
import { customTheme } from '../../config/theme';
import Authentication from '../pages/login/authentication';
import ListRequests from '../templates/requests/list';
import ShowRequest from '../templates/requests/show';

function App() {
  return (
    <Admin
      authProvider={new RemoteAuthProvider()}
      theme={customTheme}
      dataProvider={new RemoteStorageDataProvider()}
      requireAuth={false}
      i18nProvider={i18nProvider}
      loginPage={<Authentication />}
      dashboard={Dashboard}
    >
      <Resource
        options={{
          label: resources.members.label,
        }}
        icon={People}
        name={resources.members.name}
        create={CreateMember}
        list={ListMembers}
        show={ShowMember}
        edit={EditMember}
      />
      <Resource
        options={{
          label: resources.requests.label,
        }}
        icon={Update}
        name={resources.requests.name}
        list={ListRequests}
        show={ShowRequest}
      />
      <CustomRoutes noLayout>
        <Route element={<SignupMember />} path="/signup" />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
