    /**
     * 가격표 생성
     * jsPDF를 사용하여 가격표 생성
     * @returns {Promise<void>}
     * @constructor
     */
    function createPdf() {
        var array = grid.getCheckedRows();
        var pdf = new jsPDF();
        var img = new Image();

        img.src = '/assets/img/priceBoard.png';

        // 이미지 로딩을 Promise로 감싸어 처리
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

        // 이미지 로딩 후 가격표 생성
        // 쪽 여백 5mm, 이미지 간격 5mm
        // 이미지 border 1mm
        loadImage(img.src).then(function (loadedImg) {
            var imgWidth = 60;
            var imgHeight = 40;
            var positionX = 5;
            var positionY = 5;
            var pageWidth = 210;
            var pageHeight = 297;
            var margin = 5;
            var space = 1;


            // 이미지를 한 페이지에 여러 번 추가하도록 반복
            // ITEM_NM과 ITEM_PRICE 폰트 따로 적용
            // 이미지에 테두리 border 추가
            // ITEM_PRICE 글자 색은 RED
            // ITEM_NM 글자 길이가 6자 이상일 경우 폰트 크기 조절
            for (var i = 0; i < array.length; i++) {
                if (positionX + imgWidth > pageWidth) {
                    positionX = margin;
                    positionY += imgHeight + space;
                }

                pdf.addFileToVFS('malgunbd.ttf', _malgunBdfonts);
                pdf.addFont('malgunbd.ttf','malgunbd', 'normal');
                pdf.setFont('malgunbd');

                // 테두리 추가
                pdf.setLineWidth(1);
                pdf.rect(positionX, positionY, imgWidth, imgHeight);

                // 이미지 추가
                pdf.addImage(loadedImg, 'PNG', positionX, positionY, imgWidth, imgHeight);

                // ITEM_NM에 대한 폰트 및 스타일 설정 (검정색)
                pdf.setTextColor(0, 0, 0); // 검정색
                pdf.setFontSize(20);
                //pdf.text(positionX + 6, positionY + 15, array[i].ITEM_NM);

                // ITEM_NM 글자 길이에 따라 엔터
                // 6글자가 넘으면 다음 줄
                var itemNm = array[i].ITEM_NM;
                var lineHeight = 8; // 조절 가능한 줄 간격
                var maxCharPerLine8 = 6;
                var maxCharPerLine10 = 10;

                if (itemNm.length > maxCharPerLine8) {
                    // 첫 번째 줄에는 6글자까지 출력
                    pdf.setFontSize(15);
                    var firstLine = itemNm.slice(0, maxCharPerLine8);
                    pdf.text(positionX + 6, positionY + 10, firstLine);

                    // 7번째 글자부터 새로운 줄에 출력
                    var remainingText = itemNm.slice(maxCharPerLine8);
                    var lines = [];
                    for (var j = 0; j < remainingText.length; j += maxCharPerLine8) {
                        lines.push(remainingText.slice(j, j + maxCharPerLine8));
                    }

                    // 각 줄을 별도로 출력
                    for (var k = 0; k < lines.length; k++) {
                        pdf.text(positionX + 6, positionY + 8 + lineHeight * (k + 1), lines[k]);
                    }
                }else if(itemNm.length >= maxCharPerLine10){
                    pdf.setFontSize(15);
                    var firstLine = itemNm.slice(0, maxCharPerLine10);
                    pdf.text(positionX + 6, positionY + 10, firstLine);

                    // 7번째 글자부터 새로운 줄에 출력
                    var remainingText = itemNm.slice(maxCharPerLine10);
                    var lines = [];
                    for (var j = 0; j < remainingText.length; j += maxCharPerLine10) {
                        lines.push(remainingText.slice(j, j + maxCharPerLine10));
                    }

                    // 각 줄을 별도로 출력
                    for (var k = 0; k < lines.length; k++) {
                        pdf.text(positionX + 6, positionY + 8 + lineHeight * (k + 1), lines[k]);
                    }
                }
                else {
                    pdf.text(positionX + 6, positionY + 15, itemNm);
                }




                // ITEM_PRICE에 대한 폰트 및 스타일 설정 (빨간색)
                pdf.setTextColor(255, 0, 0); // 빨간색
                pdf.setFontSize(24);
                pdf.text(positionX + 14, positionY + 31, array[i].ITEM_PRICE + "원");

                // 원래의 폰트 크기로 되돌리기 (다음 루프에 영향을 주지 않게 하기 위해)
                pdf.setFontSize(20);

                positionX += imgWidth + space;
            }

            pdf.save('priceBoard.pdf');
        });

    }

    //for (var i = 0; i < array.length; i++) {
    //                 if (positionX + imgWidth > pageWidth) {
    //                     positionX = margin;
    //                     positionY += imgHeight + space;
    //                 }
    //
    //                 // 이미지에 테두리 border 추가
    //                 pdf.setLineWidth(1);
    //                 pdf.rect(positionX, positionY, imgWidth, imgHeight);
    //
    //
    //                 pdf.addImage(loadedImg, 'PNG', positionX, positionY, imgWidth, imgHeight);
    //                 pdf.addFileToVFS('malgun.ttf', _fonts);
    //                 pdf.addFont('malgun.ttf','malgun', 'normal');
    //                 pdf.setFont('malgun');
    //                 pdf.setFontSize(20);
    //                 pdf.text(positionX + 6, positionY + 15, array[i].ITEM_NM);
    //                 // array[i].ITEM_NM의 length에 따라 가격표의 글자 크기 조절
    //                 if (array[i].ITEM_NM.length > 6) {
    //                     pdf.setFontSize(16);
    //                 }
    //                 pdf.setFontSize(24);
    //                 pdf.text(positionX + 14, positionY + 31, array[i].ITEM_PRICE + "원");
    //
    //                 positionX += imgWidth + space;
    //             }



