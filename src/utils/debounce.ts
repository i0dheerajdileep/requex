let debounceTimeouts: { [key: string]: NodeJS.Timeout } = {};

export function debounce(fn: Function, delay: number, key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (debounceTimeouts[key]) clearTimeout(debounceTimeouts[key]);
    debounceTimeouts[key] = setTimeout(() => {
      fn().then(resolve).catch(reject);
    }, delay);
  });
}
