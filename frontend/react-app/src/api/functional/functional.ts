import { curry } from "ramda";
import { ObjectValue } from "../../types";
interface FunctionalFetchParam {
  url: string;
  body?: any;
  method: FetchMethod;
  dataPath?: string;
  responseType?: "FILE" | "JSON";
  file?: FormData;
}

type FunctionalFetch = <Type>(
  p2: FunctionalFetchParam
) => Promise<
  Type extends unknown[] ? Type : Type extends Promise<unknown> ? Type : Type
>;

type ContentType = ObjectValue<typeof contentType>;

export const fetchMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type FetchMethod = ObjectValue<typeof fetchMethods>;

const contentType = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
} as const;

const httpHeaders = (contentType: ContentType = "application/json") => ({
  "Content-Type": contentType,
});

const _fetch = async <Body = never>(
  headers: ReturnType<typeof httpHeaders>,
  { url, method, body, dataPath, responseType, file }: FunctionalFetchParam
) => {
  // file && file.append("payload", JSON.stringify(structuredClone({ ...body })));
  const request = await fetch(url, {
    method,
    headers,
    body:
      method === "POST"
        ? JSON.stringify(structuredClone({ payload: body }))
        : undefined,
  });
  const res =
    responseType === "FILE" ? await request.blob() : await request.json();

  const response =
    responseType === "FILE" ? res : (dataPath && res[dataPath]) || res;

  return response;
};

const curryedFetch = curry(_fetch);
const functionalFetch: FunctionalFetch = curryedFetch(httpHeaders());
export { functionalFetch, curryedFetch, httpHeaders, contentType };
