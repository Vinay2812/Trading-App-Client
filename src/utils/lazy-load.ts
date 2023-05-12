import { lazy } from "react";

export function lazyLoad(path: string, namedExport: string | null = null): any {
  return lazy(() => {
    const promise = import(/*@vite-ignore*/ path);
    if (namedExport === null) {
      return promise;
    } else {
      return promise
        .then((module: any) => {
          return { default: module[namedExport] };
        })
        .catch((err) => console.log(err));
    }
  });
}
