import { service } from './service.js';

// 微信登录
export const wxUserCode = (code) => service('/wx/user/miniProgramlogin?code=' + code, {}, 'POST');

export const wxRefreshUserInfo = (userid) => service('/wx/user/refreshUserInfo?userid=' + userid, {}, 'POST');

// 绑定提货单，填写车辆信息
export const deliveryFormAdd = (param) => service('/delivery/form/add', param, 'POST');
// 获取 绑定提货单，填写车辆信息 的详情
export const deliveryFormDetail = (param) => service('/delivery/form/detail', param, 'POST');

// 查询用户 的申请单
export const deliveryFormSelectByUserid = (userid) => service('/delivery/form/selectByUserid?userid=' + userid, {}, 'POST');


// 门卫扫码
export const deliveryOrderDetail = (code) => service('/delivery/order/detail?code=' + code, {}, 'POST');
// 确认到达
export const deliveryOrderConfirmArrive = (code) => service('/delivery/order/confirmArrive?code=' + code, {}, 'POST');
// 确认 提货
export const deliveryOrderConfirmDelivery = (code) => service('/delivery/order/confirmDelivery?code=' + code, {}, 'POST');


// 发货员
export const deliveryFormByStaffUserId = (userid) => service('/delivery/form/selectByStaffUserId?userid=' + userid, {}, 'POST');

// 详情
export const deliveryFormGetdetail = (formid) => service('/delivery/form/getdetail?formid=' + formid, {}, 'POST');

// 完成备货
export const deliveryFormStock = (formid) => service('/delivery/form/stock?formid=' + formid, {}, 'POST');


// 查询详情
export const postDeliverycode = (deliverycode) => service('/delivery/form/getinfo?deliverycode=' + deliverycode, {}, 'POST');
