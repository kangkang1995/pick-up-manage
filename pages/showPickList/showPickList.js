Page({
  data: {
    pickUpCodeList: [
      {value:'111111111'},
      { value: '2222222222' },
    ]
  },
  onLoad: function () {

  },
  _linkDetail(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../showPickListDetail/showPickListDetail?id=${index}`,
    })
  }
})
