import { useState } from 'react'

export enum Theme {
  auto = 0,
  light = 1,
  dark = 2
}

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(window.theme !== undefined ? window.theme : Theme.dark);

  // todo : 修改当前主题模式
  const changeTheme = (val: Theme) => {
    if (val === Theme.light) {
      document.body.setAttribute('data-color-scheme', '');
      document.body.classList.remove('exhibit-dark');
    } else if (val === Theme.dark) {
      document.body.setAttribute('data-color-scheme', 'dark');
      document.body.classList.add('exhibit-dark');
    } else if (val === Theme.auto) {// 根据用户系统主题判断
      const systemScheme = window.matchMedia('((prefers-color-scheme: dark))').matches;// 通过matchMedia检测当前系统是否为Dark模式
      if (systemScheme) {
        document.body.setAttribute('data-color-scheme', 'dark');
        document.body.classList.add('exhibit-dark');
      } else {
        document.body.setAttribute('data-color-scheme', '');
        document.body.classList.remove('exhibit-dark');
      }
    }
    window.theme = val;// 将当前模式编号挂载到window上方便后续使用
  }

  const onThemeChange = (val: Theme) => {
    setTheme(val);
    changeTheme(val);
  }

  return { theme, onThemeChange }
}

