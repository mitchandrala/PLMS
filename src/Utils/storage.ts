type Key = "slotData" | "activeSlotData" | "slotHistoryData";

export const getStorageData = (key: Key) => {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const setStorageData = (key: Key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};
