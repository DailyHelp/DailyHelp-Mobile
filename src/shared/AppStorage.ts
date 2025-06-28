import {STORAGE_ENCRYPTION_KEY} from '@env';
import {MMKV} from 'react-native-mmkv';
import {UserTypes} from './Constant';

const storage = new MMKV({
  id: 'storage',
  encryptionKey: STORAGE_ENCRYPTION_KEY,
});

class AppStorageData {
  user_type: UserTypes = UserTypes.USER;
  routes: Route = 'authentication';
  access_token: string = '';
  user_id: string = '';
  email: string = '';
  phone: string = '';
  firstname: string = '';
  lastname: string = '';
  middlename: string = '';
  isAuthenticated: boolean = false;
  isPhoneVerified: boolean = false;
  isIdentityVerified: boolean = false;
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

  static removeSelected(keys: (keyof AppStorageData)[]) {
    keys.forEach(key => {
      storage.delete(key);
    });
  }

  static removeAll() {
    storage.clearAll();
  }
}
