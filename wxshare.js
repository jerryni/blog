// 官方在线：http://203.195.235.76/jssdk/
alert('enter');

var script = document.createElement('script');
script.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
script.onload = function() {

    // remote script has loaded
    alert('begin config');
    wx.config({
        debug: true,

        // 下面这4个参数需要你自己从你的应用里拿
        timestamp: "",
        nonceStr: "",
        appId: "",
        signature: "",
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    });

    wx.ready(function() {
        wx.onMenuShareAppMessage({
            title: '互联网之子',
            desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
            link: '',
            imgUrl: '',
            trigger: function(res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                alert('用户点击发送给朋友');
            },
            success: function(res) {
                alert('已分享');
            },
            cancel: function(res) {
                alert('已取消');
            },
            fail: function(res) {
                alert(JSON.stringify(res));
            }
        });
    })


    alert('已注册获取“发送给朋友”状态事件');
};
script.async = false; // This is required for synchronous execution
document.documentElement.innerHTML = ''
document.documentElement.appendChild(script);
