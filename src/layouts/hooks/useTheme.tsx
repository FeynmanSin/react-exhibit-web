import { useState } from 'react';
import { Theme, changeTheme } from '@/utils/theme';
import useRequest from '../../hooks/useRequest';


export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(window.theme !== undefined ? window.theme : Theme.dark);
  const { resData, put: updateTheme } = useRequest('personalSettings', false);
  const onThemeChange = (val: Theme) => {
    setTheme(val);
    changeTheme(val);
    updateTheme({ extra: { theme: theme } });
  }
  return { theme, onThemeChange }
}

