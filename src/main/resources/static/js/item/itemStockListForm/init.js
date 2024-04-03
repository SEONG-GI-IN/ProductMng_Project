let updateList = [];
let tagList = [];
let drinkList = [];

$(function () {

    /* 날짜 셋팅 moment */
    // 시작일 default = 1일
    // 종료일 default 월 마지막일
    var startDate = moment().startOf('month').format('YYYY-MM-DD');
    var endDate = moment().endOf('month').format('YYYY-MM-DD');

    $('#startDt').val(startDate);
    $('#endDt').val(endDate);

    initializeGrid();

    getPriceTagList();

    eventbing();

});

function eventbing() {

    /* 검색 버튼 눌렀을 때 */
    $('#searchBtn').click(function () {
        refreshGrid();
    });

    /* 엔터 키 눌렀을 때 */
    $('#barCode, #itemNm').keypress(function (e) {
        if (e.keyCode == 13) {
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
        excelTemplate();
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

    /* 엑셀 다운 */
    $('#excelBtn').click(function () {
        excel();
    });

    /* 가격표 담기 버튼 눌렀을 때 */
    $('#priceCartBtn').click(function () {

        var array = grid.getCheckedRows();

        if (array.length == 0) {
            alert("상품을 선택해주세요.");
            return;
        }

        // array에서 ITEM_TAG_NM1이 있는 row만 추출
        array = array.filter(function (item) {
            return item.ITEM_TAG_NM1 !== "" && item.ITEM_TAG_NM1 !== "undefined" && item.ITEM_TAG_NM1 !== null && item.ITEM_TAG_NM1 !== undefined;
        });

        CommonUtil.postAjax("/item/insertPriceTag", {list : JSON.stringify(array)}).then(function (result) {
            alert("가격표 담기에 성공하였습니다.");
            grid.uncheckAll();
            getPriceTagList().then(r => {

            });
        }).fail(function(response) {
            alert(JSON.parse(response.responseText).message);
        });
    });

    /* 가격표 생성 버튼 눌렀을 때 */
    $('#priceBtn').click(function () {
        // 가격표 조회하기
        getPriceTagList().then(result => {

            // 데이터가 없을 경우
            if (result.list.length == 0) {
                alert("가격표 생성할 상품이 없습니다.");
                $('#itemTagDialog').modal('hide');
                return;
            }

            $('#itemTagDialog').modal('show');

            // result.list에서 ITEM_TYPE_CD가 "DRINK"인 것만 필터링
            const drinkArray = result.list.filter(function (item) {
                return item.ITEM_TYPE_CD === "DRINK";
            });

            const array = result.list.filter(function (item) {
                return item.ITEM_TYPE_CD !== "DRINK";
            });

            tagList = array;
            drinkList = drinkArray;

            $("#createDrinkTagBtn").val("음료 가격표 생성 (" + drinkArray.length + ")");
            $("#createTagBtn").val("가격표 생성 (" + array.length + ")");
        }).catch(error => {
            console.error(error);
        });
    });

    /* tagGrid selectAll 전체 체크박스 */
    $('#tagGrid').on('click', 'thead input[type="checkbox"]', function () {
        var checkboxes = document.querySelectorAll(".selectItem");
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = document.getElementById("selectAll").checked;
        });
    });


    /* createTagBtn 눌렀을 때 */
    $('#createTagBtn').click(function () {
        // 데이터가 없을 경우
        if (tagList.length == 0) {
            alert("가격표 생성할 상품이 없습니다.");
            return;
        }
        createPdf(tagList);
    });

    /* createDrinkTagBtn 눌렀을 때 */
    $('#createDrinkTagBtn').click(function () {
        // 데이터가 없을 경우
        if (drinkList.length == 0) {
            alert("음료 가격표 생성할 상품이 없습니다.");
            return;
        }
        createDrinkPdf(drinkList);
    });

    /* 가격표 삭제 버튼 눌렀을 때 */
    $('#deleteTagBtn').click(function () {

        // 체크 된 가격표 삭제
        var checkedList = $('#tagGrid').find("input[type='checkbox']:checked");

        //$('#tagGrid').find("input[type='checkbox']:checked") <span class="BAR_CODE" /> 값 가져와서 배열에 KEY VALUE 형태로 저장
        var array = [];
        checkedList.each(function (i, obj) {
            var value = $(obj).parent().parent().find(".BAR_CODE").text();
            array.push({
                "BAR_CODE": value
            });
        });

        checkedList = array;


        if (checkedList.length == 0) {
            alert("가격표를 선택해주세요.");
            return;
        }

        if (confirm("선택한 가격표를 삭제하시겠습니까?")) {
            deletePriceTag(checkedList);
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

// 가격표 담기 버튼 텍스트 업데이트 함수
function updatePriceCartButtonText(count) {
    var button = $('#priceCartBtn');
    if (count > 0) {
        button.val("가격표담기 (" + count + ")");
    } else {
        button.val("가격표담기");
    }
}

// 체크박스 체크 상태 변경 시 호출되는 함수
function updatePriceCartButtonState() {
    var checkedCount = grid.getCheckedRows().length;
    updatePriceCartButtonText(checkedCount);
}

/* 가격표 조회하기 */
function getPriceTagList(page = 1) {
    return new Promise(function (resolve, reject) {
        CommonUtil.fetchData('/item/getPriceTagList', {})
            .then(result => {
                let total = result.total;
                let list = result.list;
                tagList = list;

                $('#priceBtn').val("가격표 생성 (" + total + ")");

                addPriceTagsToTable(result);

                resolve(result);
            });
    });
}

/* 가격표 담기 삭제하기 */
function deletePriceTag(list) {
    var params ={
        list : JSON.stringify(list)
    }
    CommonUtil.postAjax("/item/deletePriceTag", params).then(function (result) {
        alert("가격표 삭제되었습니다.");
        getPriceTagList().then(r => {

        });
    });
}

/* 가격표 table에 데이터 추가 */
function addPriceTagsToTable(result) {
    var $table = $('#tagGrid');
    var $tbody = $table.find("tbody");
    var $tfoot = $table.find("tfoot");
    var len = $('#tagGrid thead th').length;

    $tbody.empty(); // 기존 테이블 내용을 모두 제거합니다.

    // 결과 리스트의 길이에 따라 처리합니다.
    if (result.list.length > 0) {
        $.each(result.list, function (i) {
            var resultArr = this;
            var $tr = $tfoot.find('tr').clone(true);
            var basicInfoArr = $tr.find('span,input');

            // 각 행에 데이터를 적용합니다.
            basicInfoArr.each(function () {
                var name = (this.nodeName == "SPAN") ? this.className : this.name;
                var value = resultArr[name] ? resultArr[name] : (resultArr[name] == 0 ? resultArr[name] : '');
                this.nodeName == "SPAN" ? this.innerHTML = value : this.value = value;

                if (name == "ITEM_PRICE") {
                    this.innerHTML = value + "원";
                } else {
                    this.innerHTML = value;
                }
            });
            // 행을 tbody에 추가합니다.
            $tbody.append($tr);
        });
    } else {
        // 결과가 없는 경우 해당 내용을 출력합니다.
        var text = "<tr><td colspan='" + len + "' text-align ='center'>데이터가 없습니다.</td></tr>";
        $tbody.append(text);
    }
}