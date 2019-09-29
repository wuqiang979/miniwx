// miniprogram/pages/cloud/cloud.js
const db = wx.cloud.database(); //初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  insert: function() {
    console.log(123)
    db.collection('user').add({
      data: {
        name: '王小三',
        age: 18
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  update: function() {
    db.collection('user')
      .doc('f885cb355d904d2506e15eb9497e529d')
      .update({
        data: {
          age: 18
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  search: function() {
    db.collection('user').where({
        name: '王小二'
      })
      .get()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  delete: function() {
    db.collection('user')
      .doc('f885cb355d904d2506e15eb9497e529d')
      .remove()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  sum: function() {
    wx.cloud.callFunction({
        name: 'sum',
        data: {
          a: 6,
          b: 6
        }
      })
      .then(res => {
        console.log(res.result.sum)
      })
      .catch(err => {
        console.log(err)
      })
  },

  getOpenId() {
    wx.cloud.callFunction({
        name: 'login'
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  batchDelete() {
    wx.cloud.callFunction({
      name: 'batchDelete'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  upload: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: 'example.png',
          filePath: tempFilePaths[0], // 文件路径
          success: res => {
            // get resource ID
            console.log(res.fileID)
            db.collection('images').add({
              data: {
                fileID: res.fileID
              }
            })
            .then(res=>{
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
          },
          fail: err => {
            // handle error
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})