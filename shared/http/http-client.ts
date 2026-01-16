const DEFAULT_REQUEST_TIMEOUT = 1000 * 60; // 1 min
const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};

export type CreateHttpClientOptions = {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
};
export type Params = string[][] | Record<string, any> | string | URLSearchParams;

export type RequestOptions = RequestInit & {
  params?: Params;
  timeout?: number;
};

export class HttpClientError extends Error {
  constructor(message: string, public readonly status: number, public readonly response?: Response) {
    super(message);
    this.name = "HttpClientError";
    if ("captureStackTrace" in Error) {
      Error.captureStackTrace(this, HttpClientError);
    }
  }
}

export function createHttpClient(options?: CreateHttpClientOptions) {
  const {
    baseUrl = "",
    defaultHeaders = {},
    timeout: defaultTimeout = DEFAULT_REQUEST_TIMEOUT
  } = options ?? {};

  function buildRequestUrl(endpoint: string, params?: Params): string {
    let url: string = endpoint.startsWith("http")
      ? endpoint
      : `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      url = url.concat("?", searchParams.toString());
    }
    return url;
  }

  function mergeHeaders(headers: HeadersInit = {}): HeadersInit {
    return {
      ...DEFAULT_HEADERS,
      ...defaultHeaders,
      ...headers
    };
  }

  return async function (url: string, requestOptions?: RequestOptions): Promise<Response> {
    const { params, timeout: requestTimeout, ...requestInitOptions } = requestOptions ?? {};

    const requestUrl = buildRequestUrl(url, params);
    const headers = mergeHeaders(requestInitOptions.headers);

    const mergeRequestOptions: RequestInit = {
      ...requestInitOptions,
      headers
    };

    try {
      const controller = new AbortController();
      const effectiveTimeout = requestTimeout ?? defaultTimeout;

      let timeoutId: NodeJS.Timeout | undefined;

      if (effectiveTimeout) {
        timeoutId = setTimeout(() => controller.abort(), effectiveTimeout);
        mergeRequestOptions.signal = controller.signal;
      }

      const response = await fetch(requestUrl, mergeRequestOptions);

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        throw new HttpClientError(
          `HTTP Error: ${response.status} ${response.statusText}`,
          response.status,
          response
        );
      }

      return response;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new HttpClientError("Request timeout", 408);
        }
      }
      if (error instanceof TypeError) {
        throw new HttpClientError(error.message, 500);
      }
      throw error;
    }
  };
}
