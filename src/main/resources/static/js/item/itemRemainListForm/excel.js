function excel(){
    var excel = new JExcel("맑은 고딕 11 #333333");

    excel.set({ sheet: 0,value: "상품재고관리" });
    var headerStyle = excel.addStyle ({
        border: "thin,thin,thin,thin #000000",
        fill: "#dedede",
        font: "맑은 고딕 11 #333333 B",
        align : "C C"
    });

    var cellStyle = excel.addStyle ({
        border: "thin,thin,thin,thin #000000",
        align : "C C"
        //format: "#,##0.00"
    });

    var params = {
        itemNm: $("input#itemNm").val(),
        itemTypeCd: $("#itemTypeCd").val(),
        barCode: $("input#barCode").val(),
        perPage: 99999,
        page: 1
    }

    CommonUtil.fetchData('/item/getItemRemainList', params)
        .then(result => {

            excel.set(0, 0, 0, "바코드", headerStyle);
            excel.set(0, 1, 0, "상품명", headerStyle);
            excel.set(0, 2, 0, "상품분류", headerStyle);
            excel.set(0, 3, 0, "재고조정", headerStyle);
            excel.set(0, 4, 0, "재고량", headerStyle);

            for (var i = 0; i < result.length; i++) {
                excel.set(0, 0, i + 1, result[i].BAR_CODE, cellStyle);
                excel.set(0, 1, i + 1, result[i].ITEM_NM, cellStyle);
                excel.set(0, 2, i + 1, result[i].ITEM_TYPE_NM, cellStyle);
                excel.set(0, 3, i + 1, result[i].ITEM_REMAIN_ADD_CNT, cellStyle);
                excel.set(0, 4, i + 1, (Number(result[i].REMAIN_CNT) + Number(result[i].ITEM_REMAIN_ADD_CNT)) + " 개", cellStyle);
            }

            excel.setColumnWidth(0, 0, 29.5);
            excel.setColumnWidth(0, 1, 29.5);
            excel.setColumnWidth(0, 2, 15);
            excel.setColumnWidth(0, 3, 15);
            excel.setColumnWidth(0, 4, 15);

            excel.generate("상품재고관리.xlsx", null, null);

        }).catch(function (error) {
        console.error(error);
    });
}