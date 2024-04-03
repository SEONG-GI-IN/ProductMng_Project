$(function () {

    eventbing();
});

function eventbing() {

    /* 취소 버튼 눌렀을 때 팝업 창 닫기 */
    $('#cnclBtn').click(function () {
        window.close();
    });

    /* 저장 버튼 눌렀을 때 */
    $('#saveBtn').click(function () {
        if (confirm("상품을 등록하시겠습니까?")) {
            var array = [];
            var objArr = $("#productDetailPopup").find("input[type='text'], select, input[type='radio']:checked");

            // 객체 배열에 데이터 저장
            objArr.each(function (i, obj) {
                var name = $(obj).attr("name");
                var id = $(obj).attr("id");
                var value = $(obj).val();

                // itemTagNm1이 8글자 초과하면 alert
                if (name == "itemTagNm1" && value.length > 8) {
                    alert("가격표명1은 8글자 이하로 입력해주세요.");
                    return false;
                }

                // itemTagNm2가 10글자 초과하면 alert
                if (name == "itemTagNm2" && value.length > 10) {
                    alert("가격표명2는 10글자 미만으로 입력해주세요.");
                    return false;
                }

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

            // 배열을 객체로 변환
            var obj = array.reduce(function (acc, cur, i) {
                acc[cur.name] = cur.value;
                return acc;
            }, {});

            CommonUtil.postAjax("/item/updateItemDtl", obj).then(function (result) {
                alert("상품이 업데이트 되었습니다.");
                // 팝업창 닫기
                window.close();
            }).fail(function(result) {
                alert("상품 업데이트에 실패하였습니다.");
            });
        }
    })
}