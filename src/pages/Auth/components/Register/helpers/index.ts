export function deleteSingleDetail<T = any>(
  detailDeleteId: number,
  setDetails: Function,
  detailsLength: number
) {
  if (detailsLength === 1) return;
  setDetails((prev: T[]) => {
    let idx = 1;
    return prev
      .filter((detail: T | any) => detail?.id !== detailDeleteId)
      .map((detail: T) => {
        return { ...detail, id: idx++ };
      });
  });
}

export function addSingleDetail<T = any>(
  detailsLength: number,
  detailData: T,
  setDetails: Function
) {
  if (detailsLength === 5) return;
  setDetails((prev: T[]) => {
    const newArr =  [...prev, detailData];
    return newArr;
  });
}
