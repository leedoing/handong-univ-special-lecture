var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
io.on('connection', function(socket){
  var random = function(list){
        return list[Math.floor(Math.random()*list.length)];
  }
  var list = new Array('한동대급식충', '내가 이거 하려고 특강 신청했나', '한동대급식충2', '최순실', '정유라', '강사님좋아요', '한동대급시충2',
                         '아집에가고싶다', '오늘은뭐먹지', '하나도안재밌네', 'IT때려쳐야지', '넘나재밌네', '한조충', '한동대급식충3', '힐러좀해주세요',
                         '트럼프', '샤샤샤', '자라나라머리머리', '강사님평가잘줄게요', '한동대급식충4', '배고프다','길라임');
  socket.username = random(list);
  io.emit('join', socket.username + '님이 입장하셨습니다.');
  socket.on('message', function(msg){
    console.log(socket.username);
    console.log('message: ' + msg);
    io.emit('message', socket.username +': '+msg);
  });
});
