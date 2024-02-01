function excel(){
    var excel = new JExcel("맑은 고딕 11 #333333");

    excel.set({ sheet: 0,value: "상품업로드" });
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

    excel.set(0, 0, 0, "바코드", headerStyle);
    excel.set(0, 1, 0, "상품명", headerStyle);
    excel.set(0, 2, 0, "상품분류", headerStyle);
    excel.set(0, 3, 0, "판매가", headerStyle);

    excel.setColumnWidth(0, 0, 29.5);
    excel.setColumnWidth(0, 1, 29.5);
    excel.setColumnWidth(0, 2, 15);
    excel.setColumnWidth(0, 3, 15);

    excel.set(0, 0, 1, "000000", cellStyle);
    excel.set(0, 1, 1, "포카칩", cellStyle);
    excel.set(0, 1, 1, "과자", cellStyle);
    excel.set(0, 2, 1, "1000", cellStyle);


    excel.generate("상품업로드.xlsx", null, null);
}