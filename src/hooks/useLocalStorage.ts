export default function useLocalStorage() {
  function set(key: string, value: any) {
    let valueToStore = value instanceof Function ? value() : value;
    valueToStore = JSON.stringify(valueToStore);
    localStorage.setItem(key, valueToStore);
  }

  function get(key: string) {
    const valueFromStore = localStorage.getItem(key);
    if (!valueFromStore) return undefined;
    return JSON.parse(valueFromStore);
  }

  const localstorage = {
    set,
    get,
  };
  return localstorage;
}
