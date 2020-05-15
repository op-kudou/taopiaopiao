// 改变时间格式的方法
function getTime(date)
{
  const weekday = new Array('周一','周二','周三','周四','周五','周六','周日')
  const year = date.getFullYear();
  let month = date.getMonth() + 1 ;
  let day = date.getDate();
  const week = weekday[date.getDay() - 1];
  if (month < 10) 
  {
    month = '0' + month;
  }
  if (day < 10) 
  {
    day = '0' + day;
  }
  const res = year + '-' + month + '-' + day + ' ' + week;
  return res;
}

// 处理数据中图片和数字格式
function changeImg(data)
{
  data.poster = 'https://gw.alicdn.com/' + data.poster + '_160x160Q75.jpg';
  // 处理数字
  // if (data.wantCount >= 10000) {
  //   data.wantCount = parseInt(data.wantCount / 1000) / 10 + '万'
  // }
  // else {
  //   let gw = data.wantCount % 10;
  //   let qw = parseInt(data.wantCount / 10);
  //   data.wantCount = qw + ',' + gw;
  // }
  // for (let i in data) {
  //   // 处理图片
  //   data[i].poster = 'https://gw.alicdn.com/' + data[i].poster + '_160x160Q75.jpg';
  //   // 处理数字
  //   if (data[i].wantCount >= 10000) {
  //     data[i].wantCount = parseInt(data[i].wantCount / 1000) / 10 + '万'
  //   }
  //   else {
  //     let gw = data[i].wantCount % 10;
  //     let qw = parseInt(data[i].wantCount / 10);
  //     data[i].wantCount = qw + ',' + gw;
  //   }
  //   // 处理日期
  //   let time = data[i].openTime.split('-');
  //   let month = time[1];
  //   let day = time[2]
  //   if (month[0] == '0') {
  //     month = month.slice(1);
  //   }
  //   if (day[0] == '0') {
  //     day = day.slice(1);
  //   }
  //   data[i].openmonth = month;
  //   data[i].openday = day;
  // }
}

// 暴露方法
module.exports = {
  getTime:getTime,
  changeImg: changeImg
}