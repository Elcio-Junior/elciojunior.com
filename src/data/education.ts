import type { Localized } from '../i18n/locales';
import type { TimelineItem } from './types';

export const education: Localized<TimelineItem[]> = {
  'pt-br': [
    { meta: '2022', title: 'Pós-graduação em Arquitetura de Software', text: 'PUC-PR' },
    { meta: '2018', title: 'Tecnologia em Análise e Desenvolvimento de Sistemas', text: 'UniGoiás' },
  ],
  en: [
    { meta: '2022', title: 'Postgraduate degree in Software Architecture', text: 'PUC-PR' },
    { meta: '2018', title: 'Associate degree in Systems Analysis and Development', text: 'UniGoiás' },
  ],
};
