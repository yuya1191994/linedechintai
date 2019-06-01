;(function () {
	'use strict';

	var owlCarousel = function(){

        new WOW().init();

        $('.owl-carousel').owlCarousel({
            items : 4,
            loop  : true,
            margin : 170,
            center : true,
            smartSpeed :900,
            nav:true,
            navText: [
                "<i class='fa carousel-left-arrow fa-chevron-left'></i>",
                "<i class='fa carousel-right-arrow fa-chevron-right'></i>"
            ],responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:1,
                    nav:true,
                    margin : 120,
                },
                1000:{
                    items:3,
                    nav:true,
                    loop:true,
                    autoplay: true,
                    autoplayTimeout: 1500,
                    navText: [
                        "<i class='fa carousel-left-arrow fa-chevron-left'></i>",
                        "<i class='fa carousel-right-arrow fa-chevron-right'></i>"
                    ],
                }
            }
        });
	};

    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'slow');
        return this; // for chaining...
    }

	$(function(){
		owlCarousel();
	});
}());

//よくある質問のhide解除
$('.plus-button').on('click', function() {
	$(this).next('div').show();
	$(this).remove();
})

//LINEID確認方法のhide解除
$('.howto_lineid_show').on('click', function() {
	$('.howto_lineid_show').hide();
	$('#howto_lineid').show();
})

//特商法のhide解除
$('.tokusho_ho_show').on('click', function() {
	$('#tokusho_ho').show();
	$('#privacy_policy').hide();
})

//プライバシーポリシーのhide解除
$('.privacy_policy_show').on('click', function() {
	$('#privacy_policy').show();
	$('#tokusho_ho').hide();
})

//トップに戻るボタンのアクション
$(function() {
  var appear = false;
  var pagetop = $('#page_top');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 2500) {  //2000pxスクロールしたら
      if (appear == false) {
        appear = true;
				$('#page_top').attr('visibility', 'visible');
        pagetop.stop().animate({
          'bottom': '50px' //下から50pxの位置に
        }, 300); //0.3秒かけて現れる
      }
    } else {
      if (appear) {
        appear = false;
        pagetop.stop().animate({
          'bottom': '-100px' //下から-50pxの位置に
        }, 300); //0.3秒かけて隠れる
      }
    }
  });
  pagetop.click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500); //0.5秒かけてトップへ戻る
    return false;
  });
});
