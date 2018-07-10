var express = require('express');
var router = express.Router();
var fs=require("fs");
  var path = require('path');
  var cryptoMO = require('crypto'); // MD5算法
  var parseString = require('xml2js').parseString; // xml转js对象
  var router = express.Router();
  var request = require('request');
  var b = new Buffer('JavaScript');
  var s = b.toString('base64');
  const public = 'cert/sand.cer'; //公钥文件
  const private = fs.readFileSync('./key/private_key.pem'); //私钥文件
  const public1=fs.readFileSync('./key/sand_public_cert_test.cer');
  const pwd = '123456'; //私钥证书密码
  // var key = wxConfig.Mch_key;
  /*
   * 根据openid 发起微信支付  
   */
  router.all('/user', function(req, res, next){
    var body={
      orderCode:"0000000001",
      totalAmount:"2017090000",
      subject:"微信h5支付",
      body:"body",
      txnTimeOut:"20181230000000",
      payMode:"sand_wxh5",
      clientIp:"192.168.3.117",
      notifyUrl:"http://192.168.3.117:3000/users/paycallback",
      frontUrl :"https://www.baidu.com",
      payExtra:"192.168.3.117",
      signType:"01"

    }
     //var b = new Buffer(JSON.stringify(body)).toString('base64')
     //console.log(b);
    //var b = new Buffer(JSON.stringify(body), 'base64')
    var urlStr = 'http://61.129.71.103:8003/gateway/api/order/pay';
    request({
          url: urlStr,
         method: 'POST',
          json: true,
          headers: {
            "content-type": "application/json",
            "version": "1.0",
        },
         body:JSON.stringify(body),
        sign:private
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
         // console.log(JSON.parse(body))
        //  var b = new Buffer(body.toString())
        //  console.log(b)


        //  var str={name :"323",age:"4545"}
        // var ss=new Buffer(str).toString('base64');
        // console.log(ss);
        var data= encodeURIComponent(body)
          console.log(body)

         res.json(data)
        
            // parseString(body, function (err, result) {

            // });
        }else{
          res.send(body)
        }
    })
  })


  router.all("/paycallback",function(req, res, next){
    var wxPayCallback=req.query||req.param;
    console.log(wxPayCallback);
  })

  module.exports = router;

  
  // router.post('/wxPaycallback', function(req, res, next) {
  //     var body = req.body.xml;
  //     parseString(body,function(err,result){    
  //         if(body.return_code=="SUCCESS"){
  //             var wxPayCallback={};
  //             wxPayCallback.openid=body.openid;
  //             wxPayCallback.appid=body.appid;
  //             wxPayCallback.mch_id=body.mch_id;
  //             wxPayCallback.out_trade_no=body.out_trade_no;
  //            // wxPayCallback.result_code=body.result_code;
  //             wxPayCallback.sign=body.sign;
  //             wxPayCallback.time_end=body.time_end;
  //             wxPayCallback.total_fee=parseInt(body.total_fee)/100;
  //             wxPayCallback.transaction_id=body.transaction_id;
  //             wxPayCallback.status="1";
  //             ordersInfo.updataorderstatus(wxPayCallback,function(data){
  //                 if(data=="SUCCESS"){
  //                     console.log("支付结果更新成功:"+new Date().getTime());
  //                     var xml = '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';
  //                     res.send(xml);
  //                 }else{
  //                     console.log("订单"+body.out_trade_no+"更新失败");
  //                 }
  //             })
              
  //         }else{
  //             console.log("支付结果通知失败:"+new Date().getTime());
  //         }
         
  //     })
  
     
  // });
  
  
  // function paysignjsapi(appid,body,mch_id,nonce_str,notify_url,openid,out_trade_no,spbill_create_ip,total_fee) {
  //     var ret = {
  //         appid: appid,
  //         body: body,
  //         mch_id: mch_id,
  //         nonce_str: nonce_str,
  //         notify_url:notify_url,
  //         openid:openid,
  //         out_trade_no:out_trade_no,
  //         spbill_create_ip:spbill_create_ip,
  //         total_fee:total_fee,
  //         trade_type: 'JSAPI'
  //     };
  //     var str = raw(ret);
  //     str = str + '&key='+key;
  //     var md5Str = cryptoMO.createHash('md5').update(str).digest('hex');
  //     md5Str = md5Str.toUpperCase();
  //     return md5Str;
  // };
  // function raw(args) {
  //     var keys = Object.keys(args);
  //     keys = keys.sort(); 
  //     var newArgs = {};
  //     keys.forEach(function(key) {
  //         newArgs[key.toLowerCase()] = args[key];
  //     });
  
  //     var str = '';
  //     for(var k in newArgs) {
  //         str += '&' + k + '=' + newArgs[k];
  //     }
  //     str = str.substr(1);
  //     return str;
  // };
  // function paysignjs(appid, nonceStr, package, signType, timeStamp) {
  //     var ret = {
  //         appId: appid,
  //         nonceStr: nonceStr,
  //         package: package,
  //         signType: signType,
  //         timeStamp: timeStamp
  //     };
  //     var str = raw1(ret);
  //     str = str + '&key='+key;
  //     return cryptoMO.createHash('md5').update(str).digest('hex');
  // };
  
  // function raw1(args) {
  //     var keys = Object.keys(args);
  //     keys = keys.sort()
  //     var newArgs = {};
  //     keys.forEach(function(key) {
  //         newArgs[key] = args[key];
  //     });
  
  //     var str = '';
  //     for(var k in newArgs) {
  //         str += '&' + k + '=' + newArgs[k];
  //     }
  //     str = str.substr(1);
  //     return str;
  // };
  // function ManthNum(){
  //   return  Math.random().toString(36).substr(2);
  // };;
  
  
  //  function get_client_ip (req) {
  //     var ip = req.headers['x-forwarded-for'] ||
  //         req.ip ||
  //         req.connection.remoteAddress ||
  //         req.socket.remoteAddress ||
  //         req.connection.socket.remoteAddress || '';
  //     if(ip.split(',').length>0){
  //         ip = ip.split(',')[0]
  //     }
  //     return ip;
  // };
  
  // module.exports = router;
  
  
  
  
  
  
  




