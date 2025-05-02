import { styled } from '@mui/material/styles';

import iconSvg from '@assets/icons/frequent.svg';
import { IconsOptions } from './icons-options.type';


export const FrequentersIcon = styled('div')((options: IconsOptions) => ({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: options.backgroundPosition || 'center right',
  backgroundSize: `${options.backgroundSize || 20}%`,
  backgroundImage: `url(${iconSvg})`,
}))