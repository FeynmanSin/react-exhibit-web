// todo: 获取css前缀

export const prettyCls = (...wrapperPrefix: string[]) => {
  return (...className: string[]) => {
    if (className && className?.length > 0) {
      return wrapperPrefix.concat(className).reduce((prefix, curPrefix) => `exhibit-${prefix}-${curPrefix}`);
    } else {
      return `exhibit-${wrapperPrefix[0]}`
    }
  }
}

