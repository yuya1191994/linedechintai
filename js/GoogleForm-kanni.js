// 注意書きのとじるボタン/ひらくボタン
$('#switchBtn').on('click', function() {
  if($(this).text() == "OK") {
    $('[name=caution]').removeClass('showbox').addClass('hidebox');
    $(this).text("ひらく");
  } else {
    $('[name=caution]').removeClass('hidebox').addClass('showbox');
    $(this).text("OK");
  }
})

// スキップ → 次へ に変換（テキスト用）
$("input[type=text].any").keyup(function(){
  var thisId = $(this).parent().attr("id");
  var underbar = thisId.lastIndexOf("_");
  var thisIdNum = thisId.substring(underbar + 1);

  if ($(this).val() != "") {
    $("#next_" + (thisIdNum)).removeClass("skip");
    $("#next_" + (thisIdNum)).text("次へ");
  } else {
    $("#next_" + (thisIdNum)).addClass("skip");
    $("#next_" + (thisIdNum)).text("スキップ");
  }
});

$("input[type=number].any").keyup(function(){
  var thisId = $(this).parent().parent().attr("id");
  var underbar = thisId.lastIndexOf("_");
  var thisIdNum = thisId.substring(underbar + 1);

  if ($(this).val() != "") {
    $("#next_" + (thisIdNum)).removeClass("skip");
    $("#next_" + (thisIdNum)).text("次へ");
  } else {
    $("#next_" + (thisIdNum)).addClass("skip");
    $("#next_" + (thisIdNum)).text("スキップ");
  }
});


// スキップ → 次へ に変換（チェックボックス用）
function changeNext(sThisId) {
  var thisId = $(sThisId).parent().attr("id");
  var underbar = thisId.lastIndexOf("_");
  var thisIdNum = thisId.substring(underbar + 1);

  if ($(sThisId).val() != "") {
    $("#next_" + (thisIdNum)).removeClass("skip");
    $("#next_" + (thisIdNum)).text("次へ");
  } else {
    $("#next_" + (thisIdNum)).addClass("skip");
    $("#next_" + (thisIdNum)).text("スキップ");
  }
}

$('.next').on('click', function() {
  var thisId = $(this).attr('id');
  var underbar = thisId.lastIndexOf("_");
  var thisIdNum = thisId.substring(underbar + 1);
  thisIdNum = parseInt(thisIdNum);

  var errmsg = validate(thisIdNum);

  if(errmsg) {
    // 戻るボタンの非表示
    $(this).prev("div").removeClass("showbox").addClass("hidebox");
    // 押したボタンの非表示
    $(this).removeClass("showbox").addClass("hidebox");

    //現在の質問ボックスを非表示
    $("#question_" + (thisIdNum)).removeClass("showbox").addClass("hidebox");
    //次の質問を表示
    $("#question_" + (thisIdNum + 1)).removeClass("hidebox").addClass("showbox");

    //次のボタンを表示
    $("#prev_" + (thisIdNum + 1)).removeClass("hidebox").addClass("showbox");
    if (thisIdNum + 1 != 16) {
      $("#next_" + (thisIdNum + 1)).removeClass("hidebox").addClass("showbox");
    }

    // LINE IDの項目で説明を表示させる
    if (thisIdNum + 1 == 2) {
      $("#howto_lineid").removeClass("hidebox").addClass("showbox");;
    } else {
      $("#howto_lineid").removeClass("showbox").addClass("hidebox");
    }

    // 最後の項目になったら送信ボタンを表示させる
    if (thisIdNum + 1 == 16) {
      $('.hoge').show();
      $("#submit").show();
    }

    $('#errmsg_' + thisIdNum).hide();
  }
});

$('.prev').on('click', function() {
  var thisId = $(this).attr('id');
  var underbar = thisId.lastIndexOf("_");
  var thisIdNum = thisId.substring(underbar + 1);
  thisIdNum = parseInt(thisIdNum);

  //現在の質問ボックスを非表示
  $("#question_" + (thisIdNum)).removeClass("showbox").addClass("hidebox");
  //次の質問を表示
  $("#question_" + (thisIdNum - 1)).removeClass("hidebox").addClass("showbox");

  //押したボタンを非表示
  $("#prev_" + (thisIdNum)).removeClass("showbox").addClass("hidebox");
  // 次へボタンを非表示
  $("#next_" + (thisIdNum)).removeClass("showbox").addClass("hidebox");

  // LINE IDの項目で説明を表示させる
  if (thisIdNum - 1 == 2) {
    $("#howto_lineid").removeClass("hidebox").addClass("showbox");
  } else {
    $("#howto_lineid").removeClass("showbox").addClass("hidebox");
  }

  //前のボタンを表示
  if(thisIdNum - 1 != 1) {
    $("#prev_" + (thisIdNum - 1)).removeClass("hidebox").addClass("showbox");
  }
  $("#next_" + (thisIdNum - 1)).removeClass("hidebox").addClass("showbox");

  $('#errmsg_' + thisIdNum).hide();

  // 確認画面から戻ったら送信ボタンを隠す
//  if (thisIdNum == 15) {
//    $("#submit").hide();
//  }
});

// 初期費用相場ボタン押下
$('#avgBtn_more').on('click', function() {
  $(this).removeClass('showbox').addClass('hidebox');
  $('#small_house_avg').removeClass('showbox').addClass('hidebox');
  $('#large_house_avg').removeClass('hidebox').addClass('showbox');
  $('#avgBtn_less').removeClass('hidebox').addClass('showbox');
});

$('#avgBtn_less').on('click', function() {
  $(this).removeClass('showbox').addClass('hidebox');
  $('#large_house_avg').removeClass('showbox').addClass('hidebox');
  $('#small_house_avg').removeClass('hidebox').addClass('showbox');
  $('#avgBtn_more').removeClass('hidebox').addClass('showbox');
});

//////////////////////////////
// バリデート
//////////////////////////////
function validate(thisIdNum) {
  var required = $("#question_" + thisIdNum).children().find("input");
  if (required.hasClass("required")) {
    var validate = required.val();
    // LINE ID限定の正規表現エラー表示
    if (required.attr("id") == "first_cost" || required.attr("id") == "max_rent"
              || required.attr("id") == "build_year")　{
      if (validate != validate.match(/^\d*[.]*\d+$/)) {
        $('#errmsg_' + thisIdNum).show();
        $('#errmsg_' + thisIdNum).text("半角数値で入力してください");
        return false;
      }
    }
    if (validate == "") {
      $('#errmsg_' + thisIdNum).show();
      $('#errmsg_' + thisIdNum).text("必須項目です");
      return false;
    } else if (required.attr("id") == "line_id") {
      if (validate != validate.match(/^[a-zA-Z0-9-._ ]{1,50}$/)) {
        $('#errmsg_' + thisIdNum).show();
        $('#errmsg_' + thisIdNum).text("正しい書式でご記入ください（半角英数字）");
        return false;
      }
    }
  }
  return true;
}

$("input.required").keyup(function() {
  if ($(this).val() != "") {
    $(this).removeClass("requiredcolor");
  } else {
    $(this).addClass("requiredcolor");
  }
});


//////////////////////////////
// 確認画面
//////////////////////////////
$("[name=confirm]").on("click", function() {
  var name           = $("#name").val();
  var line_id        = $("#line_id").val();
  var now_live       = $("#now_live").val();
  var age            = $("#age").val();
  var job            = $("#job").val();
  var month          = $("#month").val();
  var area           = $("#area").val();
  var max_rent       = $("#max_rent").val() + "万円";
  var first_cost     = $("#first_cost").val();
  var station_minute = $("#station_minute").val();
  var build_year     = $("#build_year").val();
  var madori         = $("#madori").val();
  var joken          = $("#joken").val();
  var line_tel       = $("[name=line-tel]:checked").val();
  var other_ask      = $("#other_ask").val();

  // 任意項目が空白だった場合、ハイフンを渡す
  if (first_cost == "") { first_cost = "-"; }   else {first_cost += "万円"}
  if (build_year == "") { build_year = "-"; } else {build_year += "年以内"}
  if (joken == "")      { joken      = "-"; }
  if (other_ask == "")  { other_ask  = "-"; }

  $("#name_result").text(name);
  $("#line_id_result").text(line_id);
  $("#now_live_result").text(now_live);
  $("#age_result").text(age);
  $("#job_result").text(job);
  $("#month_result").text(month);
  $("#area_result").text(area);
  $("#max_rent_result").text(max_rent);
  $("#first_cost_result").text(first_cost);
  $("#station_minute_result").text(station_minute);
  $("#build_year_result").text(build_year);
  $("#madori_result").text(madori);
  $("#joken_result").text(joken);
  $("#line_tel_result").text(line_tel);
  $("#other_ask_result").text(other_ask);
});


//以下、Googleの仕様に合わせる。
//むやみに書き換えないこと。


//////////////////////////////
// フォーム欄
//////////////////////////////
// 初期表示プルダウンのhiddenへの格納
var now_live_first = $('#now_live_select').val();
$("#now_live").val(now_live_first);

var age_first = $('#age_select').val();
$("#age").val(age_first);

var month_first = $('#month_select').val();
$("#month").val(month_first);

var age_first = $('#age_select').val();
$("#age").val(age_first);

var job = $('#job_select').val();
$("#job").val(job);

var station_minute = $('#station_minute_select').val();
$("#station_minute").val(station_minute);

var line_tel_first = $('[name=line-tel]:checked').val();
$("#line_tel").val(line_tel_first);

// LINE IDにて「わからない」を選択でテキストボックスを非活性＆ハイフンを格納
$('#dontknow').on('change', function() {
  if($(this).prop('checked')) {
    $('#line_id').prop('readonly', true);
    $('#line_id').removeClass('requiredcolor');
    $('#line_id').addClass('readonlycolor');
    $('#line_id').val("-");
  } else {
    $('#line_id').prop('readonly', false);
    $('#line_id').removeClass('readonlycolor');
    $('#line_id').addClass('requiredcolor');
    $('#line_id').val("");
  }
})
// -------変更時hiddenの格納------
// お住まいセレクトボックス
$('#now_live_select').on('change', function() {
  var sAddVal = $(this).val();
  $("#now_live").val(sAddVal);
});

// お住まいセレクトボックス
$('[name=line-tel]').on('change', function() {
  var sAddVal = $(this).val();
  $("#line_tel").val(sAddVal);
});

//年齢セレクトボックス
$('#age_select').on('change', function() {
  var sAddVal = $(this).val();
  $("#age").val(sAddVal);
});

//職業セレクトボックス
$('#job_select').on('change', function() {
  var sAddVal = $(this).val();
  $("#job").val(sAddVal);
});

//希望月セレクトボックス
$('#month_select').on('change', function() {
  var sAddVal = $(this).val();
  $("#month").val(sAddVal);
});

//駅徒歩セレクトボックス
$('#station_minute_select').on('change', function() {
  var sAddVal = $(this).val();
  $("#station_minute").val(sAddVal);
});

// ご希望間取りチェックボックス
$('[name=madori]').on('click', function() {
  var oChecked = $("[name=madori]:checked");
  var lResultVal = [];
  var sResultVal = "";

  // チェックされた値を順番に格納
  oChecked.each(function () {
    lResultVal.push($(this).val());
  });

  // 文字列に変換してhiddenに入れる
  sResultVal = lResultVal.join(",");
  $("#madori").val(sResultVal);
});

// その他条件チェックボックス
$('[name=joken]').on('click', function() {
  var oChecked = $("[name=joken]:checked");
  var lResultVal = [];
  var sResultVal = "";

  // チェックされた値を順番に格納
  oChecked.each(function () {
    lResultVal.push($(this).val());
  });

  // 文字列に変換してhiddenに入れる
  sResultVal = lResultVal.join(",");
  $("#joken").val(sResultVal);

  changeNext("#joken");
});

//その他チェックでテキストボックス出現
$('#joken_other').on('click', function() {
  if ($('#joken_other').prop('checked') == true) {
    $('#joken_other_detail_hide').show();
  } else {
    $('#joken_other_detail_hide').hide();
    //テキストボックスをクリア
    $('#joken_other_detail').val('');
  }
});

$("#joken_other_detail").on("change", function() {
  var sAddVal = $(this).val();
  var sResultVal = "";

  if (sAddVal != "") {
    var sHiddenVal = $("#joken");
    sResultVal = sHiddenVal.val() + "(" + sAddVal + ")";
    sHiddenVal.val(sResultVal);
  }
});

// 確認画面の編集ボタン押下時のアクション
$('[id^=edit_]').on('click', function() {
  var thisId = $(this).attr('id');
  var underbar = thisId.indexOf('_');
  var thisIdNum = thisId.substring(underbar + 1);
  $('#question_16').removeClass('showbox').addClass('hidebox');
  $('#prev_16').removeClass('showbox').addClass('hidebox');
  $('#question_' + thisIdNum).removeClass('hidebox').addClass('showbox');

  if (thisIdNum != 1) {
    $('#prev_' + thisIdNum).removeClass('hidebox').addClass('showbox');
  }
  $('#next_' + thisIdNum).removeClass('hidebox').addClass('showbox');
})

// 送信前の同意チェックボックス
$('#consent').on('click', function() {
  if ($(this).prop('checked')) {
    $('#submitZone').removeClass('hidebox').addClass('showbox');
  } else {
    $('#submitZone').removeClass('showbox').addClass('hidebox');
  }
})

//確認ダイアログ
$("#submit").on("click", function() {
  var validateErrCnt = 0;
  var validateErrItem = "";
  if ($("#name").val() == "")    { validateErrCnt ++; validateErrItem += "[LINEのお名前]\n"; }
  if ($("#line_id").val() == "")  { validateErrCnt ++; validateErrItem += "[LINE ID]\n"; }
  if ($("#area").val() == "")    { validateErrCnt ++; validateErrItem += "[ご希望地域・最寄駅]\n"; }
  if ($("#max_rent").val() == "") { validateErrCnt ++; validateErrItem += "[家賃上限]\n"; }
  if ($("#madori").val() == "")  { validateErrCnt ++; validateErrItem += "[ご希望間取り]\n"; }

  if (validateErrCnt == 0) { submitAjax(); }
  else { alert(validateErrItem + "が未入力です。"); }
});

//////////////////////////////
// ajax通信
//////////////////////////////
function submitAjax() {
  var data = new FormData();

  var name           = $("#name").val();
  var line_id        = $("#line_id").val();
  var now_live       = $("#now_live").val();
  var age            = $("#age").val();
  var job            = $("#job").val();
  var month          = $("#month").val();
  var area           = $("#area").val();
  var max_rent       = $("#max_rent").val() + "万円";
  var first_cost     = $("#first_cost").val();
  var station_minute = $("#station_minute").val();
  var build_year     = $("#build_year").val();
  var madori         = $("#madori").val();
  var joken          = $("#joken").val();
  var line_tel       = $("[name=line-tel]:checked").val();
  var other_ask      = $("#other_ask").val();

  // 任意項目が空白だった場合、ハイフンを渡す
  if (first_cost == "") { first_cost = "-"; }   else {first_cost += "万円"}
  if (build_year == "") { build_year = "-"; } else {build_year += "年以内"}
  if (joken == "")      { joken      = "-"; }
  if (other_ask == "")  { other_ask  = "-"; }

  // LINE通話の可否　〇＝必要であれば　×＝希望しない
  if(line_tel == "希望する") {
    line_id += "(〇)";
  } else if (line_tel == "希望しない") {
    line_id += "(×)"
  } else {
    line_id += "(△)";
  }

  data.append("entry.2005620554", name );
  data.append("entry.1045781291", line_id );
  data.append("entry.1065046570", now_live );
  data.append("entry.1166974658", age );
  data.append("entry.839337160",  job );
  data.append("entry.515024513",  month );
  data.append("entry.1059012488", area );
  data.append("entry.784770210",  max_rent );
  data.append("entry.374708814",  first_cost );
  data.append("entry.943380145",  station_minute );
  data.append("entry.1593455279", build_year );
  data.append("entry.1143126950", madori );
  data.append("entry.109458453",  joken );
  data.append("entry.1551705967", other_ask );

  $.ajax({
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeh6-hCykNZcQDly_r_7M2-bs5SvJtO4_n4fuyWOigqq9L8hA/formResponse",
    data: data,
    processData: false,
    contentType: false,
    async: false,
    type: "POST",
    statusCode: {
      0: function() {
        //Success message
        alert("送信が成功しました。\n\nLINE@の仕様上、お客様から何かメッセージを頂いてはじめて個別にお返事が可能です。\nトーク画面にて「フォームを送った」旨のメッセージを一通お送りください。");
        $("#formBox").removeClass("showbox").addClass("hidebox");
        $("#thanks").removeClass("hidebox").addClass("showbox");
        window.open('http://linedechintai.work/submit-kanni', '_blank');
      },
      200: function() {
        //fail Message
        alert("エラーが発生しました。");
      }
    }
  })
}
