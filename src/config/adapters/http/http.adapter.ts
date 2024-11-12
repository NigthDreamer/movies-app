export abstract class HttpAdapter {
  public abstract get<T>(
    url: string,
    options?: Record<string, unknown>,
  ): Promise<T>;
}
