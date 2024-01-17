const CodeMngForm = {};

$(function () {

    initializeGrid();
    initializeSubGrid();

    eventbing();
});

function eventbing() {

    //grid에서 특정 row 클릭했을 때
    $("#grid").on("click", "tbody tr", function (e) {
        const rowData = grid.getRow($(this).index());
        const codeCd = rowData.CODE_CD;
        const codeNm = rowData.UP_CODE_NM;
        CodeMngForm.codeCd = codeCd;
        CodeMngForm.codeNm = codeNm;

        var params = {
            UP_CODE_CD: codeCd
        }

        CommonUtil.postAjax("/common/getCodeList", params).then(function (result) {
            subGrid.resetData(result);
        });
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
        if (confirm("코드를 등록하시겠습니까?")) {
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
                CommonUtil.postAjax("/common/insertUpCode", array).then(function (result) {
                    if (result) {
                        alert("코드가 등록되었습니다.");
                        $('#addDialog').modal('hide');
                        refreshGrid();
                    } else {
                        alert("코드 등록에 실패하였습니다.");
                    }
                });
            }
        }
    });

    //subAddBtn 눌렀을 때 dialog 띄우기
    $('#addSubBtn').click(function () {
        // 그룹코드가 선택되어있는지 확인
        var selectedRow = grid.getFocusedCell();
        if (selectedRow.rowKey == null) {
            alert("그룹코드를 선택해주세요.");
            return false;
        }

        $('#subDialog').modal('show');
    });

    //subDialog 가 닫힐 경우 input 모든값 제거
    $('#subDialog').on('hidden.bs.modal',  () => {
        $('#subDialog').find("form")[0].reset();
    });

    //subDialog에서 저장 눌렀을 때
    $('#saveSubBtn').click(function () {
        if (confirm("코드를 등록하시겠습니까?")) {
            var array = [];
            var objArr = $("#subDialog").find("input[type='text'], select, input[type='radio']:checked");

            // 객체 배열에 데이터 저장
            objArr.each(function (i, obj) {
                var name = $(obj).attr("name");
                var value = $(obj).val();
                array.push({ name: name, value: value });
            });

            // array에 그룹코드 추가
            array.push(
                { name: "upCodeCd", value: CodeMngForm.codeCd },
                { name: "upCodeNm", value: CodeMngForm.codeNm}
            );

            // 유효성 검사
            if (subValidation()) {
                CommonUtil.postAjax("/common/insertCode", array).then(function (result) {
                    if (result) {
                        alert("코드가 등록되었습니다.");
                        $('#subDialog').modal('hide');
                        refreshSubGrid(CodeMngForm.codeCd);
                    } else {
                        alert("코드 등록에 실패하였습니다.");
                    }
                });
            }
        }
    });

    // 그룹코드 삭제 버튼 눌렀을 때
    $('#delBtn').click(function () {
        // grid에서 선택된 row가 있는지 확인
        var selectedRow = grid.getFocusedCell();
        if (selectedRow.rowKey == null) {
            alert("삭제할 그룹코드를 선택해주세요.");
            return false;
        }

        if (confirm("코드를 삭제하시겠습니까?")) {
            var params = {
                codeCd: CodeMngForm.codeCd
            }

            CommonUtil.postAjax("/common/deleteUpCode", params).then(function (result) {
                if (result) {
                    alert("코드가 삭제되었습니다.");
                    refreshGrid();
                } else {
                    alert("코드 삭제에 실패하였습니다.");
                }
            });
        }
    });

    // subGrid 삭제 버튼 눌렀을 때
    $('#delSubBtn').click(function () {
        // check된 row가 있는지 확인
        var array = subGrid.getCheckedRows();
        if (array.length == 0) {
            alert("삭제할 코드를 선택해주세요.");
            return false;
        }

        if (confirm("코드를 삭제하시겠습니까?")) {

            CommonUtil.postAjax("/common/deleteCode", {list : JSON.stringify(array)}).then(function (result) {
                if (result) {
                    alert("코드가 삭제되었습니다.");
                    refreshSubGrid(CodeMngForm.codeCd);
                } else {
                    alert("코드 삭제에 실패하였습니다.");
                }
            });
        }
    });

    function validation(){
        // 저장 할 때 유효성 검사
        var result = true;
        var objArr = $("#addDialog").find("input[type='text'], select, input[type='radio']:checked");

        objArr.each(function (i, obj) {
            var name = $(obj).attr("name");
            var value = $(obj).val();
            if (name == "CODE_CD") {
                if (value == "") {
                    alert("코드를 입력해주세요.");
                    result = false;
                    return false;
                }
            } else if (name == "CODE_NM") {
                if (value == "") {
                    alert("코드명을 입력해주세요.");
                    result = false;
                    return false;
                }
            }
        });

        return result;
    }

    function subValidation(){
        // 저장 할 때 유효성 검사
        var result = true;
        var objArr = $("#subDialog").find("input[type='text'], select, input[type='radio']:checked");

        objArr.each(function (i, obj) {
            var name = $(obj).attr("name");
            var value = $(obj).val();
            if (name == "CODE_CD") {
                if (value == "") {
                    alert("코드를 입력해주세요.");
                    result = false;
                    return false;
                }
            } else if (name == "CODE_NM") {
                if (value == "") {
                    alert("코드명을 입력해주세요.");
                    result = false;
                    return false;
                }
            }
        });

        return result;
    }
}

