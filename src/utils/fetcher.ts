import axios, { AxiosRequestConfig } from "axios";
import { debounce } from "./debounce";
import { retryRequest } from "./retry";

export interface FetchOptions extends AxiosRequestConfig {
  retries?: number;
  backoffFactor?: number;
  debounceInterval?: number;
  timeout?: number;
}

const defaultOptions: FetchOptions = {
  retries: 3,
  backoffFactor: 1000,
  debounceInterval: 1000,
  timeout: 5000,
};

export async function fetchWithRetryAndDebounce(
  url: string,
  options: FetchOptions = defaultOptions
): Promise<any> {
  const { retries, backoffFactor, debounceInterval, timeout, ...axiosOptions } = options;
  const fetchFn = () => axios({ url, timeout, ...axiosOptions });

  const key = `${url}-${JSON.stringify(options)}`;
  return debounce(() => retryRequest(fetchFn, retries!, backoffFactor!), debounceInterval!, key);
}
