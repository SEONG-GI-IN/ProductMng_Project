function excelTemplate(){
    var excel = new JExcel("맑은 고딕 11 #333333");

    excel.set({ sheet: 0,value: "상품 입고 내역 업로드" });
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

    excel.set(0, 0, 0, "입고일자", headerStyle);
    excel.set(0, 1, 0, "바코드", headerStyle);
    excel.set(0, 2, 0, "상품명", headerStyle);
    excel.set(0, 3, 0, "거래처", headerStyle);
    excel.set(0, 4, 0, "상품분류", headerStyle);
    excel.set(0, 5, 0, "매입가", headerStyle);
    excel.set(0, 6, 0, "입고량", headerStyle);

    excel.setColumnWidth(0, 0, 15);
    excel.setColumnWidth(0, 1, 29.5);
    excel.setColumnWidth(0, 2, 29.5);
    excel.setColumnWidth(0, 3, 10);
    excel.setColumnWidth(0, 4, 15);
    excel.setColumnWidth(0, 5, 10);
    excel.setColumnWidth(0, 6, 10);

    excel.set(0, 0, 1, "20240101", cellStyle);
    excel.set(0, 1, 1, "000000", cellStyle);
    excel.set(0, 2, 1, "포카칩", cellStyle);
    excel.set(0, 3, 1, "도매", cellStyle);
    excel.set(0, 4, 1, "과자", cellStyle);
    excel.set(0, 5, 1, "1000", cellStyle);
    excel.set(0, 6, 1, "16", cellStyle);

    excel.generate("상품입고업로드.xlsx", null, null);
}

function excel(){
    var excel = new JExcel("맑은 고딕 11 #333333");

    excel.set({ sheet: 0,value: "상품입고관리" });
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
        supplierCd: $("#supplierCd").val(),
        barCode: $("input#barCode").val()
    }

    CommonUtil.fetchData('/item/getItemStockList', params)
        .then(result => {

            excel.set(0, 0, 0, "입고일자", headerStyle);
            excel.set(0, 1, 0, "바코드", headerStyle);
            excel.set(0, 2, 0, "상품명", headerStyle);
            excel.set(0, 3, 0, "거래처", headerStyle);
            excel.set(0, 4, 0, "상품분류", headerStyle);
            excel.set(0, 5, 0, "매입가", headerStyle);
            excel.set(0, 6, 0, "입고량", headerStyle);

            for (var i = 0; i < result.length; i++) {
                excel.set(0, 0, i + 1, result[i].STOCK_DT, cellStyle);
                excel.set(0, 1, i + 1, result[i].BAR_CODE, cellStyle);
                excel.set(0, 2, i + 1, result[i].ITEM_NM, cellStyle);
                excel.set(0, 3, i + 1, result[i].SUPPLIER, cellStyle);
                excel.set(0, 4, i + 1, result[i].ITEM_TYPE_NM, cellStyle);
                excel.set(0, 5, i + 1, result[i].PURCHASE_PRICE, cellStyle);
                excel.set(0, 6, i + 1, result[i].IN_CNT, cellStyle);
            }

            excel.setColumnWidth(0, 0, 15);
            excel.setColumnWidth(0, 1, 29.5);
            excel.setColumnWidth(0, 2, 29.5);
            excel.setColumnWidth(0, 3, 10);
            excel.setColumnWidth(0, 4, 15);
            excel.setColumnWidth(0, 5, 10);
            excel.setColumnWidth(0, 6, 10);

            excel.generate("상품입고관리.xlsx", null, null);
        });
}