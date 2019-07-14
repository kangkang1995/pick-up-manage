import { baseUrl } from '../config';
export const service = (url = '', data = {}, method = 'GET', header = {}) => {
  const app = getApp();
  method = method.toUpperCase();
  url = baseUrl + url;
  header = { ...header };

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      method,
      success: function (data) {
        resolve(data);
      },
      fail: function (err) {
        reject(err);
      }
    })
  })
}