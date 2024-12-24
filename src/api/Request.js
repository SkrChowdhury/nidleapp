import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API = 'http://192.168.11.16:8081/';
const PROD_API = 'http://192.168.24.70:8080/nidle4a/';
const TEST_API = 'http://192.168.10.53:8081/';
const FOUR_A_API = 'http://192.168.10.70:8081/';
const YUNUSCO = 'http://nidle.yunusco.com:8081/';
const WEBVIEW = 'http://192.168.10.53/nidle4a/';
// const WEBVIEW = 'http://192.168.10.70/nidle4a/';
// const WEBVIEW = 'http://nidle.yunusco.com/';

class Request {
  constructor() {
    this.url = TEST_API;
  }

  header(token, headers) {
    return axios.create({
      timeout: 10000000,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getEndPoint() {
    return WEBVIEW;
  }

  async getToken() {
    this.token = await AsyncStorage.getItem('token');
  }

  async delete(path, object) {
    try {
      const response = await axios(
        await this.setHeader(path, 'delete', object),
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async get(path, object) {
    try {
      return await axios(await this.setHeader(path, 'get', object));
    } catch (error) {
      throw error;
    }
  }

  async put(path, object) {
    try {
      return await axios(await this.setHeader(path, 'put', object));
    } catch (error) {
      throw error;
    }
  }

  async post(path, object) {
    try {
      return await axios(await this.setHeader(path, 'post', object));
    } catch (error) {
      throw error;
    }
  }

  async setHeader(path, method, object) {
    const token = await AsyncStorage.getItem('token');
    return {
      method,
      url: this.url + path,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: object ? JSON.stringify(object) : undefined,
    };
  }
}

export default new Request();
