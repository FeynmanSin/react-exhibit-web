import useRequest from '../hooks/useRequest';

export enum Theme {
  auto = 0,
  light = 1,
  dark = 2
}
// todo: 修改Dark/Light模式
export const changeTheme = (val: Theme) => {
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

// todo: 获取当前主题模式
export const getTheme = () => {

}

// todo: 判断是否为暗黑模式
export const isDarkMode = () => {
  return (
    document.body.classList.contains('exhibit-dark') &&
    document.body.getAttribute('data-color-scheme') === 'dark'
  )
}