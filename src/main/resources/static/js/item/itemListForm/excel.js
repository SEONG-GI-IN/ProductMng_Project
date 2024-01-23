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
        format : "@",
        align : "C C"
    });

    excel.set(0, 0, 0, "상품명", headerStyle);
    excel.set(0, 1, 0, "거래처", headerStyle);
    excel.set(0, 2, 0, "상품분류", headerStyle);
    excel.set(0, 3, 0, "수량", headerStyle);
    excel.set(0, 4, 0, "매입가", headerStyle);

    excel.setColumnWidth(0, 0, 29.5);
    excel.setColumnWidth(0, 1, 15);
    excel.setColumnWidth(0, 2, 10);
    excel.setColumnWidth(0, 3, 10);
    excel.setColumnWidth(0, 4, 15);

    excel.set(0, 0, 1, "상품명", cellStyle);
    excel.set(0, 1, 1, "거래처", cellStyle);
    excel.set(0, 2, 1, "과자", cellStyle);
    excel.set(0, 3, 1, "1", cellStyle);
    excel.set(0, 4, 1, "1000", cellStyle);

    excel.generate("상품업로드.xlsx", null, null);
}