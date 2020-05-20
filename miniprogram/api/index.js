const getData = (url, param) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'GET',
      data: param,
      success (res) {
        console.log(res)
        resolve(res.data)
      },
      fail (err) {
        console.log(err)
        reject(err)
      }
    })
  })
}
module.exports={
  getData
}