function wrapFetch(prom: Promise<Response>): Promise<any> {
  return prom
    .then((x) => x.json())
    .then((x) => {
      if (x.data) return x.data;
      if (x.error) throw new Error(x.error);
    });
}
export function get<T = any>(url: string): Promise<T> {
  return wrapFetch(fetch(url));
}

export function post<T = any>(
  url: string,
  { body, contentType = "application/json" }
): Promise<T> {
  return wrapFetch(
    fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "content-type": contentType },
    })
  );
}
