import { TranslationMessages } from 'ra-core';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import portugueseMessages from 'ra-language-portuguese';

const messages: Record<string, unknown | TranslationMessages>  = {
  pt: {
    ...portugueseMessages,
    ra: {
      ...portugueseMessages.ra,
      page: {
        ...portugueseMessages.ra.page,
        empty: 'Nenhum registro para ser exibido',
      },
    },
  },
};

const i18nProvider = polyglotI18nProvider((locale) => messages[locale] as TranslationMessages, 'pt');

export { i18nProvider };
