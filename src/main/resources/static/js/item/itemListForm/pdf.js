/**
 * 가격표 생성
 * jsPDF를 사용하여 가격표 생성
 * @returns {Promise<void>}
 * @constructor
 */
function createPdf(tagList) {
    const array = tagList;
    const itemTypeCd = "DRINK";

    // array에서 ITEM_TYPE_CD가 "DRINK"인 것만 필터링
    const Array = array.filter(function (item) {
        return item.ITEM_TYPE_CD !== itemTypeCd;
    });

    var pdf = new jsPDF();
    var img = new Image();
    img.src = '/assets/img/priceTag.png';

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            var img = new Image();

            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                reject(new Error('Error loading image: ' + src));
            };
            img.src = src;
        });
    }

    loadImage(img.src).then(function (loadedImg) {
        var imgWidth = 60;
        var imgHeight = 38;
        var positionX = 15;
        var positionY = 5;
        var pageWidth = 210;
        var pageHeight = 297;
        var margin = 5;
        var space = 1;
        var imagesPerPage = 18; // 한 페이지에 들어갈 이미지 개수
        var imagesCount = 0; // 페이지에 추가된 이미지 개수

        for (var i = 0; i < Array.length; i++) {
            if (imagesCount >= imagesPerPage) {
                pdf.addPage();
                imagesCount = 0;
                positionX = margin + 10;
                positionY = margin;
            }

            if (positionX + imgWidth > pageWidth) {
                positionX = margin + 10;
                positionY += imgHeight + space;
            }

            // 이미지를 추가한 후에 이미지 개수를 증가시킴
            imagesCount++;

            //폰트 추가
            pdf.addFileToVFS('Cafe24Ohsquare.ttf', _cafe24Ohsquare);
            pdf.addFont('Cafe24Ohsquare.ttf','Cafe24Ohsquare', 'normal');
            pdf.setFont('Cafe24Ohsquare');

            // 테두리 추가
            pdf.setLineWidth(1);
            pdf.rect(positionX, positionY, imgWidth, imgHeight);

            // 이미지 추가
            pdf.addImage(loadedImg, 'PNG', positionX, positionY, imgWidth, imgHeight);

            // ITEM_NM에 대한 폰트 및 스타일 설정 (검정색)
            pdf.setTextColor(0, 0, 0); // 검정색
            pdf.setFontSize(20);

            var itemTagNm1 = array[i].ITEM_TAG_NM1;
            var itemTagNm2 = array[i].ITEM_TAG_NM2;
            if(Array[i].ITEM_TAG_NM2 != ""){
                pdf.setFontSize(20); // ITEM_NM의 폰트 크기 설정
                pdf.text(positionX + 6, positionY + 9, itemTagNm1); // ITEM_NM 출력
                pdf.setFontSize(14); // ITEM_NM2의 폰트 크기 설정
                pdf.text(positionX + 6, positionY + 15, itemTagNm2); // ITEM_NM2 출력
            } else {
                pdf.setFontSize(24); // 기본 폰트 크기로 설정
                pdf.text(positionX + 4, positionY + 13, itemTagNm1); // ITEM_NM 출력
            }


            // ITEM_PRICE에 대한 폰트 및 스타일 설정 (빨간색)
            pdf.setTextColor(255, 0, 0); // 빨간색
            pdf.setFontSize(24);
            pdf.text(positionX + 10, positionY + 24, array[i].ITEM_PRICE + "원");

            // 바코드 이미지 추가
            var barcodeDataUrl = createBarcode(array[i].BAR_CODE);
            var barcodeImg = new Image();
            barcodeImg.src = barcodeDataUrl;
            pdf.addImage(barcodeImg, 'PNG', (positionX + imgWidth / 2) - 27, (positionY + imgHeight + 5) -18, imgWidth - 5, (imgHeight / 2) - 5);

            // 원래의 폰트 크기로 되돌리기 (다음 루프에 영향을 주지 않게 하기 위해)
            pdf.setFontSize(20);

            positionX += imgWidth + space;
        }

        pdf.save('priceBoard.pdf');

        deletePriceTag();
    });
}

/* 음료 가격표 생성 */
function createDrinkPdf(tagList) {
    const array = tagList;
    const itemTypeCd = "DRINK";

    // array에서 ITEM_TYPE_CD가 "DRINK"인 것만 필터링
    const drinkArray = array.filter(function (item) {
        return item.ITEM_TYPE_CD === itemTypeCd;
    });

    var pdf = new jsPDF();
    var img = new Image();
    img.src = '/assets/img/priceTag.png';

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            var img = new Image();

            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                reject(new Error('Error loading image: ' + src));
            };
            img.src = src;
        });
    }

    loadImage(img.src).then(function (loadedImg) {
        var imgWidth = 60;
        var imgHeight = 38;
        var positionX = 15;
        var positionY = 5;
        var pageWidth = 210;
        var pageHeight = 297;
        var margin = 5;
        var space = 1;
        var imagesPerPage = 18; // 한 페이지에 들어갈 이미지 개수
        var imagesCount = 0; // 페이지에 추가된 이미지 개수

        for (var i = 0; i < drinkArray.length; i++) {
            if (imagesCount >= imagesPerPage) {
                pdf.addPage();
                imagesCount = 0;
                positionX = margin + 10;
                positionY = margin;
            }

            if (positionX + imgWidth > pageWidth) {
                positionX = margin + 10;
                positionY += imgHeight + space;
            }

            // 이미지를 추가한 후에 이미지 개수를 증가시킴
            imagesCount++;

            //폰트 추가
            pdf.addFileToVFS('Cafe24Ohsquare.ttf', _cafe24Ohsquare);
            pdf.addFont('Cafe24Ohsquare.ttf','Cafe24Ohsquare', 'normal');
            pdf.setFont('Cafe24Ohsquare');

            // 테두리 추가
            pdf.setLineWidth(1);
            pdf.rect(positionX, positionY, imgWidth, imgHeight);

            // 이미지 추가
            pdf.addImage(loadedImg, 'PNG', positionX, positionY, imgWidth, imgHeight);

            // ITEM_NM에 대한 폰트 및 스타일 설정 (검정색)
            pdf.setTextColor(0, 0, 0); // 검정색
            pdf.setFontSize(20);

            var itemTagNm1 = array[i].ITEM_TAG_NM1;
            var itemTagNm2 = array[i].ITEM_TAG_NM2;
            if(drinkArray[i].ITEM_TAG_NM2 != ""){
                pdf.setFontSize(20); // ITEM_NM의 폰트 크기 설정
                pdf.text(positionX + 6, positionY + 9, itemTagNm1); // ITEM_NM 출력
                pdf.setFontSize(14); // ITEM_NM2의 폰트 크기 설정
                pdf.text(positionX + 6, positionY + 15, itemTagNm2); // ITEM_NM2 출력
            } else {
                pdf.setFontSize(24); // 기본 폰트 크기로 설정
                pdf.text(positionX + 4, positionY + 13, itemTagNm1); // ITEM_NM 출력
            }


            // ITEM_PRICE에 대한 폰트 및 스타일 설정 (빨간색)
            pdf.setTextColor(255, 0, 0); // 빨간색
            pdf.setFontSize(24);
            pdf.text(positionX + 10, positionY + 24, array[i].ITEM_PRICE + "원");

            // 바코드 이미지 추가
            var barcodeDataUrl = createBarcode(array[i].BAR_CODE);
            var barcodeImg = new Image();
            barcodeImg.src = barcodeDataUrl;
            pdf.addImage(barcodeImg, 'PNG', (positionX + imgWidth / 2) - 27, (positionY + imgHeight + 5) -18, imgWidth - 5, (imgHeight / 2) - 5);

            // 원래의 폰트 크기로 되돌리기 (다음 루프에 영향을 주지 않게 하기 위해)
            pdf.setFontSize(20);

            positionX += imgWidth + space;
        }

        pdf.save('priceBoard.pdf');

        //deletePriceTag(itemTypeCd);
    });
}

/* 바코드 번호로 바코드 이미지 생성 */
function createBarcode(barCode) {
    var canvas = document.createElement('canvas');
    JsBarcode(canvas, barCode, {
        format: "CODE128",
        width: 1.5,
        height: 15, // 바코드 이미지 높이를 조정하여 반으로 줄임
        displayValue: true, // 바코드 번호 출력 설정
        fontSize: 10, // 바코드 번호 폰트 크기 설정
        fontOptions: "bold", // 바코드 번호 폰트 굵기 설정
        background: "transparent" // 바코드 배경을 투명으로 설정
    });
    return canvas.toDataURL(); // 이미지로 변환하여 반환
}
