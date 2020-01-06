//読み込み時に実行するとこ
$(function(){
    /*時計*/
    setInterval(function(){
        var dd = new Date();
        $("#T1").text(dd.toLocaleString());
    },1000);


    /*クロスフェード*/
    // 切り替わりの間隔
    var $interval = 4000;
    // フェード処理の早さ
    var $fadeSpeed = 2000;
    //対象ブロックの指定 
    var $setElm = $('#viewer');
    //setElmに対して繰り返し
    $setElm.each(function(){
        //イベントが発生したオブジェクト
        var $targetObj = $(this);
        //オブジェクト内のul検知
        var $findUl = $targetObj.find('ul');
        //オブジェクト内のli検知
        var $findLi = $targetObj.find('li');
        //オブジェクト内で最初に出てきたliを検知
        var $findLiFirst = $targetObj.find('li:first');

        //cssの直書き
        $findLi.css({display:'block',opacity:'0',zIndex:'99'});
        //アニメーションの実行
        //stop():アニメーションをすぐに停止させるためのもの
        $findLiFirst.css({zIndex:'100'}).stop().animate({opacity:'1'},$fadeSpeed);
        //
        setInterval(function(){
            //findUlの先頭に対してfadespeedの速さで透明にする。(nextまで)
            //透明にした次の要素のliを最前面に持ってきて不透明にする
            //findUlに透明にした要素を追加して背面に移動(end()で一つ前の選択状態に戻るため))
            $findUl.find('li:first-child').animate({opacity:'0'},$fadeSpeed).next('li').css({zIndex:'100'}).animate({opacity:'1'},$fadeSpeed).end().appendTo($findUl).css({zIndex:'99'});
        },$interval);
    });

    /*画像分割表示*/
    //width=32,height=32に設定
    var sprite = {width:32,height:32}
    //
    var image = new Image
    image.crossOrigin= 'Anonymous'
    image.src= 'https://cdn.rawgit.com/nagadomi/otama/master/image/lena.jpg'
    image.onload = function(){
        var canvas= document.createElement('canvas')
        canvas.width= sprite.width
        canvas.height= sprite.height
      
        var context= canvas.getContext('2d')
        //表示部
        for(var i=0; i*sprite.height<image.height; i++){
          for(var j=0; j*sprite.width<image.width; j++){
            context.drawImage(
              image,j*sprite.width,i*sprite.height,
              sprite.width,sprite.height,
              0,0,
              sprite.width,sprite.height
            )
            
            var spriteElement= new Image
            //canvasのデータをURIデータに変換する
            spriteElement.src= canvas.toDataURL()
            //containerの子要素に追加(32*32のブロック)
            document.querySelector('#container').appendChild(spriteElement)
          }
        }
    }

    $('#button').on('click',function(){
        var Elm = $('#container');
        $('#button_check').css('background','red');
        Elm.each(function(){
            var targetObj = $(this);
            setInterval(function(){
                targetObj.find('img:first-child').addClass('appeared').next('img');                
            },1000);       
        })
    })
});
