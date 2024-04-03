function excel() {
    var supplierCdList = [];
    var supplierNmList = [];
    var supplierCd = document.getElementById("supplierCd");
    for(var i = 0; i < supplierCd.length; i++){
        if (supplierCd[i].value != "") {
            supplierCdList.push(supplierCd[i].value);
            supplierNmList.push(supplierCd[i].text);
        }
    }

    for (var i = 0; i < supplierCdList.length; i++) {
        var excel = new JExcel("맑은 고딕 11 #333333");

        excel.setColumnWidth(0, 0, 29.5);
        excel.setColumnWidth(0, 1, 15);
        excel.setColumnWidth(0, 2, 10);
        excel.setColumnWidth(0, 3, 10);
        excel.setColumnWidth(0, 4, 10);

        var headerStyle = excel.addStyle({
            border: "thin,thin,thin,thin #000000",
            fill: "#dedede",
            font: "맑은 고딕 11 #333333 B",
            align: "C C"
        });

        var cellStyle = excel.addStyle({
            border: "thin,thin,thin,thin #000000",
            align: "C C"
        });

        var params = {
            supplierCd: supplierCdList[i],
            page: 1,
            pageSize: 99999
        }

        $.ajax({
            url: "/item/getItemBuyList",
            type: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(params),
            async: false,
            success: function(result) {
                if (result.total > 0) {
                    var list = result.list;
                    for (var j = 0; j < list.length; j++) {
                        excel.set(0, 0, 0, "상품명", headerStyle);
                        excel.set(0, 1, 0, "거래처", headerStyle);
                        excel.set(0, 3, 0, "매입가", headerStyle);
                        excel.set(0, 4, 0, "재고수량", headerStyle);
                        excel.set(0, 5, 0, "구매수량", headerStyle);


                        excel.set(0, 0, j + 1, list[j].ITEM_NM, cellStyle);
                        excel.set(0, 1, j + 1, list[j].SUPPLIER, cellStyle);
                        excel.set(0, 3, j + 1, list[j].PURCHASE_PRICE, cellStyle);
                        excel.set(0, 4, j + 1, list[j].REMAIN_CNT, cellStyle);
                        excel.set(0, 5, j + 1, "", cellStyle);
                    }

                    var sheetName = supplierNmList[i]; // 거래처 코드를 시트 이름으로 설정
                    excel.generate("상품매입리스트_" + sheetName + ".xlsx", null, null);
                } else {
                    console.log("데이터가 없습니다. 파일 생성을 건너뜁니다.");
                }
            }
        });
    }
}
