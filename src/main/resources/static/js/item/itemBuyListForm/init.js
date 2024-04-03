itemBuyListForm = {};
let debounceTimer;

$(function () {

    getBuyList();

    eventBinding();
});

function eventBinding() {
    /* 검색 버튼 눌렀을 때 */
    $('#searchBtn').click(function () {
        getBuyList();
    });

    /* 엔터 키 눌렀을 때 */
    $('#barCode, #itemNm').keypress(function (e) {
        if (e.keyCode == 13) {
            getBuyList();
        }
    });

    /* 불러오기 버튼 눌렀을 때 */
    $('#loadBtn').click(function () {
        // P_INSERT_ITEM_BUY_LIST 프로시저 호출
        CommonUtil.fetchData("/item/insertItemBuyList", {})
            .then(result => {
                alert("불러오기 완료");
                getBuyList();
            });
    });

    /* addRowBtn 눌렀을 때 */
    $('#addBtn').click(function () {
        const tbody = document.querySelector("#dataList tbody");
        const noDataRows = tbody.querySelectorAll(".no-data");
        if (noDataRows.length > 0) tbody.removeChild(noDataRows[0]);

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td style="text-align: center"><a href="#" class="minusBtn"><img src="/images/minus_icon.png"></a></td>
        <td>
            <div class="position-relative">
                <input type='text' id="itemNm" class="form-control">
                <ul class="itemNmList list-group position-absolute" style="display: none;"></ul>
            </div>
        </td>
        <td><span name="barCode"></span></td>
        <td>
            <select id="supplierList" class="form-control" style="text-align: center;">
                <option value="">전체</option>
                ${itemBuyListForm.supplierList.map(supplier => `
                    <option value="${supplier.CODE_CD}">${supplier.CODE_NM}</option>
                `).join('')}
            </select>
        </td>
        <td>
            <select id="itemTypeList" class="form-control" style="text-align: center;">
                <option value="">전체</option>
                ${itemBuyListForm.itemTypeList.map(itemType => `
                    <option value="${itemType.CODE_CD}">${itemType.CODE_NM}</option>
                `).join('')}
            </select>
        </td>
        <td><input type='number' id="purchasePrice" class="form-control"></td>
        <td><input type='number' id="remainCnt" class="form-control"></td>
        <td><input type='number' id="buyCnt" class="form-control"></td>
        <td><select class="form-control" id="buyUnit">
            <option value="EA">EA</option>
            <option value="BOX">BOX</option>
        </select></td>
    `;

        // 첫 번째 행으로 삽입
        if (tbody.firstChild) {
            tbody.insertBefore(newRow, tbody.firstChild);
        } else {
            tbody.appendChild(newRow);
        }
    });


    /* itemNm input에 입력 시 검색어 자동 완성 */
    $('#dataList').on('keyup', '#itemNm', function (event) {
        const itemNm = $(this).val();
        const $itemNm = $(this);
        const $itemNmList = $itemNm.next('.itemNmList');
        const $itemNmItems = $itemNmList.find('li');
        let selectedIndex = $itemNmItems.filter('.selected').index();
        let isFirstItemSelected = false; // 첫 번째 항목이 선택되었는지 확인하는 변수

        // 방향키로 선택 이동
        const moveSelection = function(direction) {
            if (selectedIndex === -1 && direction === 1) { // 아래 방향키를 처음 눌렀을 때
                selectedIndex = 0; // 첫 번째 항목부터 시작
                isFirstItemSelected = true; // 첫 번째 항목이 선택되었음을 표시
                $itemNmItems.eq(selectedIndex).addClass('selected').css('background-color', 'lightgray');
            } else {
                if (selectedIndex !== -1) {
                    $itemNmItems.eq(selectedIndex).removeClass('selected').css('background-color', '');
                    selectedIndex += direction;
                } else {
                    selectedIndex = direction === 1 ? 0 : $itemNmItems.length - 1; // 방향에 따라 첫 번째 또는 마지막 항목 선택
                }
            }
            selectedIndex = selectedIndex < 0 ? $itemNmItems.length - 1 : selectedIndex % $itemNmItems.length;

            // 선택된 항목 업데이트
            const $selectedItem = $itemNmItems.eq(selectedIndex);
            $selectedItem.addClass('selected').css('background-color', 'lightgray');
        };

        if (event.keyCode === 38) { // 위 방향키
            moveSelection(-1);
        } else if (event.keyCode === 40) { // 아래 방향키
            moveSelection(1);
        }

        // Enter 키로 선택된 항목 입력란에 채우기
        if (event.keyCode === 13) {
            const selectedValue = $itemNmItems.filter('.selected').data('itemnm');
            $itemNm.val(selectedValue);
            $itemNmList.hide();

            // 가운데 정렬
            $itemNm.closest('td').find('input').css('text-align', 'center');

            // 바코드 자동 입력
            const barCode = $itemNmItems.filter('.selected').data('barcode');1
            $itemNm.closest('tr').find('[name=barCode]').text(barCode);

            // 포커스 이동
            $itemNm.closest('tr').find('#supplierList').focus();
        }
    });

    // 텍스트 입력 이벤트 핸들러
    $('#dataList').on('input', '#itemNm', function(event) {
        const itemNm = $(this).val();
        const $itemNm = $(this);
        const $itemNmList = $itemNm.next('.itemNmList');
        const $itemNmItems = $itemNmList.find('li');
        let isFirstItemSelected = false; // 첫 번째 항목이 선택되었는지 확인하는 변수

        if (itemNm.length > 0 && !isFirstItemSelected) {
            // fetchData 호출
            CommonUtil.fetchData("/item/getItemNmList", {itemNm: itemNm})
                .then(result => {
                    $itemNmList.empty();

                    // itemNmList에 검색 결과 추가
                    result.forEach(item => {
                        $itemNmList.append(`
                        <li class="list-group-item" data-itemNm="${item.ITEM_NM}" data-barCode="${item.BAR_CODE}">
                            ${item.ITEM_NM} (${item.BAR_CODE})
                        </li>
                    `);
                    });

                    $itemNmList.show();
                    $itemNmItems.removeClass('selected').css('background-color', ''); // 선택 해제
                    $itemNmItems.first().addClass('selected').css('background-color', 'lightgray'); // 첫 번째 항목 선택
                })
                .catch(error => {
                    console.error("Error occurred while fetching item name list:", error);
                });
        } else {
            // 입력값이 없거나 첫 번째 항목이 이미 선택된 경우에는 리스트를 숨김
            $itemNmList.hide();
        }
    });


    /* 검색어 자동 완성 영역에서 선택된 항목을 입력란에 채우기 */
    $('#dataList').on('click', '.itemNmList li', function () {
        const $itemNm = $(this).closest('td').find('#itemNm');
        const selectedValue = $(this).data('itemNm');
        $itemNm.val(selectedValue);
        $(this).closest('.itemNmList').hide();
    });

    /* 자동 완성 영역 숨기기 */
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.itemNmList').length) {
            $('.itemNmList').hide();
        }
    });

    /* tab 키 눌렀을 때 */
    $('#dataList').on('keydown', 'input, select', function (event) {
        if (event.keyCode === 9) {
            event.preventDefault();
            const $inputs = $(this).closest('tr').find('input, select');
            const index = $inputs.index(this);

            if (index === $inputs.length - 1) {
                $inputs[0].focus();
            } else {
                $inputs[index + 1].focus();
            }
        }
    });

    /* shift + tab 키 눌렀을 때 */
    $('#dataList').on('keydown', 'input, select', function (event) {
        if (event.shiftKey && event.keyCode === 9) {
            event.preventDefault();
            const $inputs = $(this).closest('tr').find('input, select');
            const index = $inputs.index(this);

            if (index === 0) {
                $inputs[$inputs.length - 1].focus();
            } else {
                $inputs[index - 1].focus();
            }
        }
    });

    /* minusBtn 눌렀을 때 */
    $('#dataList').on('click', '.minusBtn', function () {
        // 클릭된 버튼이 속한 행을 찾아서 삭제
        $(this).closest('tr').remove();

        // 만약 테이블에 더 이상 행이 없다면 "데이터가 없습니다." 메시지를 보여줌
        if ($('#dataList tbody tr').length === 0) {
            $('#dataList tbody').append(`
            <tr class="no-data">
                <td colspan="6" style="text-align: center;">데이터가 없습니다.</td>
            </tr>
        `);
        }
    });

    /* 수정 버튼 눌렀을 때 */
    $('#updateBtn').click(function () {
        const tbody = document.querySelector("#dataList tbody");
        const rows = tbody.querySelectorAll("tr");

        const itemList = [];
        rows.forEach(row => {
            const item = {
                // 각 열에서 필요한 데이터 추출하여 객체로 만들기
                barCode: row.querySelector('[name=barCode]').textContent,
                itemNm: row.querySelector('#itemNm').value,
                supplierCd: row.querySelector('#supplierList').value,
                supplier: row.querySelector('#supplierList').selectedOptions[0].text,
                itemTypeCd: row.querySelector('#itemTypeList').value,
                itemTypeNm: row.querySelector('#itemTypeList').selectedOptions[0].text,
                //span name으로 찾기
                purchasePrice: row.querySelector('[name=purchasePrice]').textContent,
                remainCnt: row.querySelector('[name=remainCnt]').textContent,
                buyCnt: row.querySelector('#buyCnt').value,
                buyUnit: row.querySelector('#buyUnit').value
            };
            itemList.push(item);
        });

        var params = {
            list: JSON.stringify(itemList)
        }

        CommonUtil.fetchData("/item/updateItemBuyList", params)
            .then(result => {
                alert("저장 완료");
                getBuyList();
            })
            .catch(error => {
                console.error("Error occurred while updating item list:", error);
                alert("저장 중 오류가 발생했습니다.");
            });
    });


    /* 엑셀다운 버튼 눌렀을 때 */
    $('#excelBtn').click(function () {
        excel();
    });
}

function getBuyList(page = 1) {
    const pageSize = 10; // 페이지당 항목 수
    const params = {
        itemNm: $("input#itemNm").val(),
        itemTypeCd: $("#itemTypeCd").val(),
        supplierCd: $("#supplierCd").val(),
        page: page,
        pageSize: pageSize
    };

    CommonUtil.fetchData("/item/getItemBuyList", params)
        .then(result => {
            const tbody = document.querySelector("#dataList tbody");
            tbody.innerHTML = "";

            // 페이징 관련 변수 설정
            const totalPages = Math.ceil(result.total / pageSize);
            const currentPage = result.currentPage;

            const supplierList = result.supplierList;
            const itemTypeList = result.itemTypeList;

            itemBuyListForm.supplierList = supplierList;
            itemBuyListForm.itemTypeList = itemTypeList;

            // 데이터 출력
            result.list.forEach(item => {
                const newRow = tbody.insertRow();
                newRow.innerHTML = `
                    <td style="text-align: center;">
                        <a href="#" class="minusBtn">
                            <img src="/images/minus_icon.png">
                        </a>
                    </td>
                    <td><input type='text' id="itemNm" class="form-control" style="text-align: center;" value="${item.ITEM_NM}"></td>
                    <td><span name="barCode">${item.BAR_CODE}</span></td>
                    <td>
                        <select id="supplierList" class="form-control" style="text-align: center;">
                            ${supplierList.map(supplier => `
                                <option value="${supplier.CODE_CD}" ${supplier.CODE_CD === item.SUPPLIER_CD ? 'selected' : ''}>${supplier.CODE_NM}</option>
                            `).join('')}
                        </select>
                    </td>
                    <td>
                        <select id="itemTypeList" class="form-control" style="text-align: center;">
                            ${itemTypeList.map(itemType => `
                                <option value="${itemType.CODE_CD}" ${itemType.CODE_CD === item.ITEM_TYPE_CD ? 'selected' : ''}>${itemType.CODE_NM}</option>
                            `).join('')}
                        </select>
                    </td>
                    <td style="text-align: center;"><span name="purchasePrice">${item.PURCHASE_PRICE}</span></td>
                    <td style="text-align: center;"><span name="remainCnt">${item.REMAIN_CNT}</span></td>
                    <td><input type='text' id="buyCnt" class="form-control" style="text-align: center;" value="${item.BUY_CNT}"></td>
                    <td>
                        <select id="buyUnit" class="form-control" style="text-align: center;">
                            <option value="EA" ${item.BUY_UNIT === 'EA' ? 'selected' : ''}>EA</option>
                            <option value="BOX" ${item.BUY_UNIT === 'BOX' ? 'selected' : ''}>BOX</option>
                        </select>
                    </td>
                `;
            });

            // 페이징 UI 출력
            renderPagination(currentPage, totalPages);
        });
}

function renderPagination(currentPage, totalPages) {
    var $pagination = $('.pagination');
    $pagination.empty();

    // 맨 처음 페이지 버튼
    var $firstPage = $('<button>').addClass('btn btn-sm btn-outline-secondary').text('<<');
    $firstPage.on('click', function () {
        if (currentPage > 1) {
            getBuyList(1);
        }
    });
    $pagination.append($firstPage);

    // 이전 페이지 버튼
    if (currentPage > 1) {
        var $prevPage = $('<button>').addClass('btn btn-sm btn-outline-secondary').text('<');
    } else {
        var $prevPage = $('<button>').addClass('btn btn-sm btn-outline-secondary').text('<').prop('disabled', true);
        $firstPage.prop('disabled', true);
    }

    $prevPage.on('click', function () {
        if (currentPage > 1) {
            getBuyList(currentPage - 1);
        }
    });
    $pagination.append($prevPage);

    // 페이지 번호 버튼들
    for (var i = 1; i <= totalPages; i++) {
        var $pageBtn = $('<button>').addClass('btn btn-sm btn-outline-secondary').text(i);
        if (i === currentPage) {
            $pageBtn.addClass('active');
        }
        $pageBtn.on('click', function () {
            getBuyList(parseInt($(this).text()));
        });
        $pagination.append($pageBtn);
    }

    // 다음 페이지 버튼
    if (currentPage < totalPages) {
        var $nextPage = $('<button>').addClass('btn btn-sm btn-outline-secondary').text('>');
        $nextPage.on('click', function () {
            if (currentPage < totalPages) {
                getBuyList(currentPage + 1);
            }
        });

        $pagination.append($nextPage);
    } else {
        var $nextPage = $('<button>').addClass('btn btn-sm btn-outline-secondary').text('>').prop('disabled', true);
        $pagination.append($nextPage);
    }

    // 맨 마지막 페이지 버튼
    var $lastPage = $('<button>').addClass('btn btn-sm btn-outline-secondary').text('>>');
    $lastPage.on('click', function () {
        if (currentPage < totalPages) {
            getBuyList(totalPages);
        }
    });
    $pagination.append($lastPage);
}




