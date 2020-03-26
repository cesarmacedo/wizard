import I18n from 'react-native-i18n';

I18n.fallbacks = true;
I18n.defaultLocale = 'pt-BR';

I18n.translations = {
  'pt-BR': require('../translations/pt-BR'),
};

export default I18n;
