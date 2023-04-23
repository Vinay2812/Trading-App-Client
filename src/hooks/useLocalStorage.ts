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

  function remove(key: string) {
    localStorage.removeItem(key);
  }

  function removeAll() {
    localStorage.clear();
  }

  const localstorage = {
    set,
    get,
    remove,
    removeAll,
  };
  return localstorage;
}
