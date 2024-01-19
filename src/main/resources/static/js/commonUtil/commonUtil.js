"commonUtil.js"

var CommonUtil = {};

$(function(){
    /** 숫자만 입력 **/
    // $(document).on("keydown", "input[type='text'].numberFormat", function(e){
    // 	var available = [1,2,3,4,5,6,7,8,9,0, 69, 49];
    // 	if(available.filter((a) => {return a == e.key}).length < 1){
    // 		e.preventDefault();
    // 		e.stopPropagation();
    // 	}
    // });
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