function excel() {
    var supplierCdList = [];
    var supplierNmList = [];
    var supplierCd = document.getElementById("supplierCd");
    var supplierObj = new Object();
    for(var i = 0; i < supplierCd.length; i++){
        if (supplierCd[i].value != "") {
            supplierObj[supplierCd[i].value] = supplierCd[i].text
            supplierCdList.push(supplierCd[i].value);
            // supplierNmList.push(supplierCd[i].text);
        }
    }

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
                        var index = 0;
                        var obj = new Object();
                        $.each(supplierObj, function(key, value) {
                            var arr = new Array();
                            $.each(list, function(j, item) {
                                if(item.SUPPLIER_CD == key){
                                    arr.push(item);
                                }
                            });
                            obj[value] = arr;
                        });

                        // $.each(supplierObj, function(key, value) {
                        //     excel.addSheet(value);
                        //     $.each(list, function(j, item) {
                        var sheetNm = "";
                        $.each(obj, function(key, list) {
                            if(list.length > 0){
                                if(index == 0){
                                    sheetNm = key;
                                    excel.set( { sheet : 0, value : sheetNm} );
                                }else{
                                    excel.addSheet(key);
                                }
                                $.each(list, function(j, item) {
                                    excel.set(index, 0, 0, "상품명", headerStyle);
                                    excel.set(index, 1, 0, "거래처", headerStyle);
                                    excel.set(index, 2, 0, "매입가", headerStyle);
                                    excel.set(index, 3, 0, "재고수량", headerStyle);
                                    excel.set(index, 4, 0, "구매수량", headerStyle);
                                    excel.set(index, 5, 0, "구매단위", headerStyle);

                                    excel.set(index, 0, j + 1, list[j].ITEM_NM, cellStyle);
                                    excel.set(index, 1, j + 1, list[j].SUPPLIER, cellStyle);
                                    excel.set(index, 2, j + 1, list[j].PURCHASE_PRICE, cellStyle);
                                    excel.set(index, 3, j + 1, list[j].REMAIN_CNT, cellStyle);
                                    excel.set(index, 4, j + 1, list[j].BUY_CNT, cellStyle);
                                    excel.set(index, 5, j + 1, list[j].BUY_UNIT, cellStyle);
                                });
                                index++;
                            }else{
                                console.log("데이터가 없습니다. 파일 생성을 건너뜁니다.");

                            }

                        });
                        excel.generate("상품매입리스트_.xlsx", null, null);
                    } else {
                        console.log("데이터가 없습니다. 파일 생성을 건너뜁니다.");
                    }
                }
            });


}
