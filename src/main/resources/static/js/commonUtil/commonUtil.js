"commonUtil.js"

var CommonUtil = {};

$(function(){
    $(document).on("keyup", "input[type='text'].numberFormat", function(){
        var number = $(this).val().replace(/[^-\.0-9]/g, "");
        $(this).val(number);
    });

});

/**
 * post 방식 Ajax, Promise객체 리턴 ( Ajax의 후처리를 위해 사용 )
 */
CommonUtil.postAjax = function( _path, _params ) {
    var url = _g_contextPath_ + _path;
    return $.ajax({
        url : url,
        type : "post",
        data : _params,
        datatype : "json"
    });
};

/**
 * get 방식 Ajax, Promise객체 리턴 ( Ajax의 후처리를 위해 사용 )
 * @param _path
 * @param _params
 * @returns {*}
 */
CommonUtil.getAjax = function( _path, _params ) {
    var url = _g_contextPath_ + _path;
    return $.ajax({
        url : url,
        type : "get",
        data : _params,
        datatype : "json"
    });
}

/**
 * file upload Ajax, Promise객체 리턴 ( Ajax의 후처리를 위해 사용 )
 */
CommonUtil.fileUpload = function( _path, _params ) {
    var url = _g_contextPath_ + _path;
    return $.ajax({
        url : url,
        type : "post",
        data : _params,
        enctype : "multipart/form-data",
        processData : false,
        contentType : false,
        cache : false,
        async : false
    });
}

/**
 * Grid에서 선택된 Row의 데이터를 가져온다.
 */
CommonUtil.getClickedRowData = function (_this) {
    const rowIndex = _this.index();
    return grid.getRow(rowIndex);
};

/**
 * 마진 계산
 * ex) 매입가가 1000원이고 마진율이 50%일 때, 1000 + 1000 * 50% = 1500원
 */
CommonUtil.calculateMargin = function (purchasePrice, marginRate) {
    return purchasePrice + purchasePrice * marginRate / 100;
}

CommonUtil.fetchData = function (url, params) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 설정에 따라 다를 수 있음
        },
        body: JSON.stringify(params),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

// 옵션1 ) 금액에 천단위 콤마(,) 처리
// 옵션2 ) 1234567 -> 123만4567처럼 4자리마다 '만'을 붙이기
CommonUtil.priceFormat = function (x, option) {
    if (option === "만") {
        return x.toString().replace(/\B(?=(\d{4})+(?!\d))/g, '만');
    } else if(option === ","){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// 팝업 창 띄우기
CommonUtil.openPopup = function (url, params, name, width, height) {
    var popupX = (window.screen.width / 2) - (width / 2);
    var popupY = (window.screen.height / 2) - (height / 2);
    // 새로운 창 열기
    var popupWindow = window.open(url + "?" + $.param(params), name, "width=" + width + ", height=" + height + ", left=" + popupX + ", top=" + popupY);

    // 팝업 창을 화면 가운데로 이동
    if (window.focus) {
        popupWindow.focus();
    }
}
