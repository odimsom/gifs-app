export default class LocalStorageHelper {
  public static SaveToLocalStorage = <type>(key: string, value: type): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  public static LoadFromLocalStorage = <type>(key: string): type | [] => {
    const CurrentsValueFromLocalStorage = localStorage.getItem(key);
    return CurrentsValueFromLocalStorage
      ? JSON.parse(CurrentsValueFromLocalStorage)
      : [];
  };

  public static GetKeys = (): string[] => {
    return Object.keys(localStorage);
  };
}
