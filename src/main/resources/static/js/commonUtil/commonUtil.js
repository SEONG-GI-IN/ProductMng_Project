"commonUtil.js"

const CommonUtil = {};
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