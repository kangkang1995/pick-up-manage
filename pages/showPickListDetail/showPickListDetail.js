import {
  deliveryFormGetdetail,
  deliveryFormStock
} from "../../utils/getData.js"

Page({
  data: {
    detailDate: {},
    detailID: '',
  },
  onLoad: function(option) {
    let id = option.id;
    this._getDatailDate(id)
  },
  _getDatailDate(id) {
    deliveryFormGetdetail(id)
      .then(
        res => {
          if (res.data.code === 200) {
            if (res.data.data.stockState === 0) {
              res.data.data.orders.map(function(item, index) {
                item.selectStatus = false;
                item.divideOrders.map(function(newItem, index) {
                  newItem.selectStatus = false;
                })
              })
            } else {
              res.data.data.orders.map(function(item, index) {
                item.selectStatus = true;
                item.divideOrders.map(function(newItem, index) {
                  newItem.selectStatus = true;
                })
              })
            }
            this.setData({
              detailDate: res.data.data,
              detailID: id,
            })
          } else {
            this._showToast(res.data.message)
          }
        }
      )
      .catch(
        err => {
          this._showToast('服务报错')
        }
      )
  },
  checkAllChange(e) {
    let checkedid = e.currentTarget.dataset.checkedid;
    let detailDate = this.data.detailDate;
    let selectStatus = e.currentTarget.dataset.selectstatus;
    if (detailDate.stockState === 0) {
      detailDate.orders.map(function(item, index) {
        if (item.deliveryOrderCode === checkedid) {
          item.selectStatus = !selectStatus;
          item.divideOrders.map(function(newItem, newIndex) {
            newItem.selectStatus = !selectStatus;
          })
        }
      })
      this.setData({
        detailDate
      })
    }
  },
  checkListChange(e) {
    let checkedid = e.currentTarget.dataset.checkedid;
    let detailDate = this.data.detailDate;
    let selectStatus = e.currentTarget.dataset.selectstatus;
    let parent = e.currentTarget.dataset.parent;
    let sonListNoSelect = [];

    if (detailDate.stockState === 0) {
      detailDate.orders.map(function(item, index) {
        if (item.deliveryOrderCode === parent) {
          if (selectStatus === true) {
            item.selectStatus = false;
          }
          item.divideOrders.map(function(newItem, newIndex) {
            if (newItem.queryCode === checkedid) {
              newItem.selectStatus = !selectStatus;
            }
          })
        }
      })

      detailDate.orders.map(function(item, index) {
        if (item.deliveryOrderCode === parent) {
          item.divideOrders.map(function(newItem, newIndex) {
            if (!newItem.selectStatus) {
              sonListNoSelect.push(item.deliveryOrderCode)
            }
          })
        }
      })

      if (sonListNoSelect.length === 0) {
        detailDate.orders.map(function(item, index) {
          if (item.deliveryOrderCode === parent) {
            item.selectStatus = true
          }
        })
      }

      this.setData({
        detailDate
      })
    }


  },
  // 完成备货
  _confirmDelivery() {
    let detailDate = this.data.detailDate;
    let noSelect = []; //未选择的数量
    detailDate.orders.map(function(item, index) {
      if (!item.selectStatus) {
        noSelect.push(item.selectStatus)
      }
    })
    if (noSelect.length > 0) {
      this._showToast("未全部备货完成")
      return false
    }
    let detailID = this.data.detailID;
    deliveryFormStock(detailID)
      .then(
        res => {
          if (res.data.code === 200) {
            this._showToast("提交成功")
            wx.navigateTo({
              url: `../showPickList/showPickList`,
            })
          } else {
            this._showToast(res.data.message)
          }
        }
      )
      .catch(
        err => {
          this._showToast('服务报错')
        }
      )
  },
  // 提示
  _showToast: function(text) {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },
})