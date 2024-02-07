let updateList = [];

$(function () {

    /* 날짜 셋팅 moment */
    // 시작일 default = 1일
    // 종료일 default 월 마지막일
    var startDate = moment().startOf('month').format('YYYY-MM-DD');
    var endDate = moment().endOf('month').format('YYYY-MM-DD');

    $('#startDt').val(startDate);
    $('#endDt').val(endDate);

    eventbing();


});

function eventbing() {

    /* 검색 버튼 눌렀을 때 */
    $('#searchBtn').click(function () {
        refreshGrid();
    });

    /* 엔터 키 눌렀을 때 */
    $('#itemNm').keydown(function(key) {
        if (key.keyCode == 13) {
            refreshGrid();
        }
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
                var id = $(obj).attr("id");
                var value = $(obj).val();

                // itemTypeCdDiv select box의 경우 value값을 가져오지 못하므로 따로 처리
                // 예를들어 value가 "1"이면 ITEM_TYPE_CD = "1"이고 ITEM_TYPE_NM = "식품"이다.
                if (id == "itemTypeCdDiv") {  // id에서 name으로 변경
                    var itemTypeCd = value;
                    var itemTypeNm = $(obj).find("option:selected").text();
                    array.push({
                        name: "itemTypeCd",  // id에서 name으로 변경
                        value: itemTypeCd
                    });
                    array.push({
                        name: "itemTypeNm",  // id에서 name으로 변경
                        value: itemTypeNm
                    });
                    return true;
                }

                if (id == "supplierCdDiv") {  // id에서 name으로 변경
                    var supplierCd = value;
                    var supplier = $(obj).find("option:selected").text();
                    array.push({
                        name: "supplierCd",  // id에서 name으로 변경
                        value: supplierCd
                    });
                    array.push({
                        name: "supplier",  // id에서 name으로 변경
                        value: supplier
                    });
                    return true;
                }

                // 기존에 해당 name이 이미 있는지 확인
                var existingItem = array.find(function(item) {
                    return item.name === name;  // id에서 name으로 변경
                });

                // 이미 해당 name이 있다면 배열로 유지하도록 처리
                if (existingItem) {
                    existingItem.value = [existingItem.value, value];
                } else {
                    array.push({
                        name: name,  // id에서 name으로 변경
                        value: value
                    });
                }
            });

            console.log(array);

            // 유효성 검사
            if (validation()) {
                CommonUtil.postAjax("/item/insertItem", array).then(function (result) {
                    if (result) {
                        alert("상품이 등록되었습니다.");
                        $('#addDialog').modal('hide');
                        refreshGrid();
                    } else {
                        alert("상품 등록에 실패하였습니다.");
                    }
                });
            }
        }
    });

    // 양식다운로드 버튼 눌렀을 때
    $("input[name='downTemplate']").click(function () {
        excel();
    });

    // 업로드 버튼 눌렀을 때
    $('#uploadBtn').click(function () {
        // ItemUploadForm modal 띄우기
        $('#uploadDialog').modal('show');
    });

    // 업로드 다이얼로그 닫힐 때
    $('#uploadDialog').on('hidden.bs.modal',  () => {
        $('#uploadDialog').find("form")[0].reset();
    });

    // uploadDialog에서 파일 선택 시
    $('#file').change(function () {
        var file = $('#file')[0].files[0];
        $('#fileName').val(file.name);
    });

    // 업로드 다이얼로그에서 저장 눌렀을 때
    $('#uploadDialog #uploadBtn').click(function () {
        if (confirm("업로드 하시겠습니까?")) {
            var formData = new FormData();
            formData.append("excelFile", $('#file')[0].files[0]);

            // 파일이 없을 때
            if ($('#file')[0].files[0] == null) {
                alert("파일을 선택해주세요.");
                return;
            }

            CommonUtil.fileUpload("/item/uploadItemStock", formData).then(function (result) {
                    alert("업로드 되었습니다.");
                    $('#uploadDialog').modal('hide');
                    refreshGrid();
            }).fail(function(response) {
               try {
                   alert( JSON.parse(response.responseText).message );
               } catch (e) {
                   $("#file").val("");
                   $("#fileName").val("");
                   alert("파일을 다시 선택한 후 업로드해주세요.");
               }
            });
        }
    });

    // 삭제버튼 눌렀을 때
    $('#delBtn').click(function () {
        if (confirm("삭제하시겠습니까?")) {
            var array = tuiGrid.getCheckedRows();

            CommonUtil.postAjax("/item/deleteItem", {list : JSON.stringify(array)}).then(function (result) {
                if (result) {
                    alert("삭제되었습니다.");
                    refreshGrid();
                } else {
                    alert("삭제에 실패하였습니다.");
                }
            });
        }
    });

    /* 상품 분류 수정 될 때 */
    // 그리드 데이터가 변경 될 때마다 호출
    grid.on('afterChange', function (e) {
        var columnName = e.changes[0].columnName;
        var rowKey = e.changes[0].rowKey;

        var updateItem = {};
        var changedValue = e.changes[0].value;

        // 변경된 데이터를 updateList에 저장
        updateItem.rowKey = rowKey;
        updateItem.columnName = columnName;
        updateItem.changedValue = changedValue;

        // updateList에 해당 rowKey가 있는지 확인
        var existingItem = updateList.find(function(item) {
            return item.rowKey === rowKey;
        });

        // 이미 해당 rowKey가 있다면 배열로 유지하도록 처리
        if (existingItem) {
            existingItem.columnName = [existingItem.columnName, columnName];
            existingItem.changedValue = [existingItem.changedValue, changedValue];
        } else {
            updateList.push(updateItem);
        }
        
        /* 변경 된 데이터 cell 색상 변경 */
        if (updateList.some(item => item.rowKey === rowKey)) {

            // 변경된 셀의 배경색을 변경
            const cellElement = grid.getElement(rowKey, columnName);
            if (cellElement) {
                cellElement.style.backgroundColor = 'yellow';
            }
        }
    });

    // 수정 버튼 눌렀을 때
    $('#updateBtn').click(function () {
        if (confirm("수정하시겠습니까?")) {
            CommonUtil.postAjax("/item/updateItemStock", {list : JSON.stringify(updateList)}).then(function (result) {
                alert("수정되었습니다.");
                // 그리드 데이터 초기화
                refreshGrid();

            }).fail(function(response) {
                alert(JSON.parse(response.responseText).message);
            }).always(function() {
                // 수정된 데이터 초기화
                updateList = [];
                // 변경된 셀의 배경색을 변경
                const cellElement = grid.getElement();
                if (cellElement) {
                    cellElement.style.backgroundColor = '';
                }

            });
        }
    });

    /* 가격표 생성 버튼 눌렀을 때 */
    $('#priceBtn').click(function () {
        createPdf();
    });

}

function validation() {
    // 저장 할 때 유효성 검사
    var result = true;
    var objArr = $("#addDialog").find("input[type='text'], select, input[type='radio']:checked");

    objArr.each(function (i, obj) {
        var name = $(obj).attr("name");
        var value = $(obj).val();

        if (name == "itemNm" && value == "") {
            alert("상품명을 입력해주세요.");
            result = false;
            return false;
        } else if (name == "itemTypeCd" && value == "") {
            alert("상품분류를 선택해주세요.");
            result = false;
            return false;
        } else if (name == "supplierCd" && value == "") {
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
