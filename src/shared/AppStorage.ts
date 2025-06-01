import {MMKV, Mode} from 'react-native-mmkv';
import {UserTypes} from './Constant';

const storage = new MMKV({
  id: 'storage',
  encryptionKey: '30ba48b9a8d622c34318',
});

class AppStorageData {
  user_type?: UserTypes;
  routes?: Route;
  access_token?: string;
  user_id?: string;
}

export default class AppStorage {
  static save(
    key: keyof AppStorageData,
    value: string | boolean | number | ArrayBuffer,
  ) {
    storage.set(key, value);
  }

  static find(key: keyof AppStorageData) {
    const data = new AppStorageData();
    let type = data[key];

    if (typeof type === 'number') return storage.getNumber(key);
    if (typeof type === 'boolean') return storage.getBoolean(key);
    if (typeof type === 'string') return storage.getString(key);
    if (Array.isArray(data[key])) return storage.getBuffer(key);
  }

  static remove(key: keyof AppStorageData) {
    storage.delete(key);
  }

  static removeAll() {
    storage.clearAll();
  }
}
