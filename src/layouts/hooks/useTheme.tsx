import { useState } from 'react';
import { Theme, changeTheme } from '@/utils/theme';
import personalSettings from '@/apis/personalSettings';


export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(window.theme !== undefined ? window.theme : Theme.dark);
  const onThemeChange = (val: Theme) => {
    setTheme(val);
    changeTheme(val);
    personalSettings.updatePersonalSettings(theme);
  }
  return { theme, onThemeChange }
}

