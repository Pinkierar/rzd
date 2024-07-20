import {Fail, HttpClient, HttpMethod, ParsedQs, type RequestConfig} from 'core';

export abstract class ExHttpClient extends HttpClient {
  protected abstract errorHandler<ResBody>(response: ResBody | Fail): ResBody

  protected override async request<
    ResBody,
    ReqBody = undefined,
    ReqQuery extends ParsedQs | undefined = undefined,
    H extends HttpMethod = HttpMethod,
  >(
    httpMethod: H,
    url: string,
    body?: H extends HttpMethod.Get ? undefined : ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<ResBody> {
    const response = await super.request<ResBody, ReqBody, ReqQuery, H>(httpMethod, url, body, reqQuery, config);

    return this.errorHandler(response);
  }

  /**
   * POST HTTP request
   */
  protected override async post<
    ResBody,
    ReqBody = undefined,
    ReqQuery extends ParsedQs | undefined = undefined,
  >(
    url: string,
    body?: ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<ResBody> {
    return this.request<ResBody, ReqBody, ReqQuery>(
      HttpMethod.Post,
      url,
      body,
      reqQuery,
      config,
    );
  }

  /**
   * GET HTTP request
   */
  protected override async get<
    ResBody,
    ReqBody = undefined,
    ReqQuery extends ParsedQs | undefined = undefined,
  >(
    url: string,
    body?: ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<ResBody> {
    return this.request<ResBody, ReqBody, ReqQuery>(
      HttpMethod.Get,
      url,
      body,
      reqQuery,
      config,
    );
  }

  /**
   * PUT HTTP request
   */
  protected override async put<
    ResBody,
    ReqBody = undefined,
    ReqQuery extends ParsedQs | undefined = undefined,
  >(
    url: string,
    body?: ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<ResBody> {
    return this.request<ResBody, ReqBody, ReqQuery>(
      HttpMethod.Put,
      url,
      body,
      reqQuery,
      config,
    );
  }

  /**
   * DELETE HTTP request
   */
  protected override async delete<
    ResBody,
    ReqBody = undefined,
    ReqQuery extends ParsedQs | undefined = undefined,
  >(
    url: string,
    body?: ReqBody,
    reqQuery?: ReqQuery,
    config?: RequestConfig,
  ): Promise<ResBody> {
    return this.request<ResBody, ReqBody, ReqQuery>(
      HttpMethod.Delete,
      url,
      body,
      reqQuery,
      config,
    );
  }
}