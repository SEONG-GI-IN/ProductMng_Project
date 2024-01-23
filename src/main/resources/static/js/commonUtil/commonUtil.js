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