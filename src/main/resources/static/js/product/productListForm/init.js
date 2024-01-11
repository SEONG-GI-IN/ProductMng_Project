$(function () {

    initializeGrid();

    $('.list-date').val(moment().format('YYYY-MM-DD'));

    eventbing();
});

function eventbing() {

    $('#btn_search').click(function(){
        refreshGrid();
    });

    //addBtn 눌렀을 때 dialog 띄우기
    $('#addBtn').click(function () {
        $('#addDialog').modal('show');
    });

    //dialog 가 닫힐 경우 input 모든값 제거
    $('#addDialog').on('hidden.bs.modal',  () => {
        $('#addDialog').find("form")[0].reset();
    });

    //addDialog에서 저장 눌렀을 때
    $('#saveBtn').click(function () {
        if (confirm("상품을 등록하시겠습니까?")) {
            var array = [];
            var objArr = $("#addDialog").find("input[type='text'], select, input[type='radio']:checked");

            // 객체 배열에 데이터 저장
            objArr.each(function (i, obj) {
                var name = $(obj).attr("name");
                var value = $(obj).val();
                array.push({ name: name, value: value });
            });

            // 유효성 검사
            if (validation()) {
                CommonUtil.postAjax("/product/insertProduct", array).then(function (result) {
                    if (result) {
                        alert("상품이 등록되었습니다.");
                        $('#addDialog').modal('hide');
                        grid();
                    } else {
                        alert("상품 등록에 실패하였습니다.");
                    }
                });
            }
        }
    });
}

function validation() {
    // 저장 할 때 유효성 검사
    var result = true;
    var objArr = $("#addDialog").find("input[type='text'], select, input[type='radio']:checked");

    objArr.each(function (i, obj) {
        var name = $(obj).attr("name");
        var value = $(obj).val();

        if (name == "productName" && value == "") {
            alert("상품명을 입력해주세요.");
            result = false;
            return false;
        } else if (name == "productPrice" && value == "") {
            alert("판매가격을 입력해주세요.");
            result = false;
            return false;
        } else if (name == "productCategory" && value == "") {
            alert("상품분류를 선택해주세요.");
            result = false;
            return false;
        } else if (name == "supplier" && value == "") {
            alert("거래처를 입력해주세요.");
            result = false;
            return false;
        } else if (name == "purchasePrice" && value == "") {
            alert("매입가를 입력해주세요.");
            result = false;
            return false;
        }
    });

    return result;
}
