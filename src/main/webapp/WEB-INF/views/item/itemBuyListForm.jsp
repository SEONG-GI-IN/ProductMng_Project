<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/tui-grid.css" type="text/css" />
    <script src="/js/tui-grid.js"></script>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
<div class="page-title">
    <h4>[상품구매관리화면]</h4>
</div>

<div class="search-container">
    <dl class="form-group">

        <dt>상품분류</dt>
        <dd>
            <select id="itemTypeCd" class="form-select" style="width: 250px">
                <option value="">전체</option>
                <c:forEach var="item" items="${itemTypeList}">
                    <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                </c:forEach>
            </select>
        </dd>

        <dt>거래처</dt>
        <dd>
            <select id="supplierCd" class="form-select" style="width: 250px">
                <option value="">전체</option>
                <c:forEach var="item" items="${supplierList}">
                    <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                </c:forEach>
            </select>
        </dd>

        <dt>바코드</dt>
        <dd>
            <input type="text" id="barCode" class="form-control" placeholder="바코드를 입력하세요" />
        </dd>

        <dt>상품명</dt>
        <dd>
            <input type="text" id="itemNm" class="form-control" placeholder="상품명을 입력하세요" />
        </dd>

        <button type="button" id="searchBtn">검색</button>
    </dl>

</div>

<!-- 등록 삭제 수정 -->
<div class="right-btn">
    <input type="button" id="addBtn" value="추가" />
    <input type="button" id="delBtn" value="삭제" />
    <input type="button" id="updateBtn" value="수정" />
    <input type="button" id="loadBtn" value="불러오기" />
    <input type="button" id="excelBtn" value="엑셀다운" />
</div>

<table id="dataList" style="width: 98%; margin-top: 30px; margin-left: 20px;">
    <colgroup>
        <col width="2%">
        <col width="20%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
    </colgroup>
    <thead>
    <tr>
        <th style="text-align: center">
            <a id="addRowBtn"><img src="/images/plusImg.png"></a>
        </th>
        <th style="text-align: center">상품명</th>
        <th style="text-align: center">바코드</th>
        <th style="text-align: center">거래처</th>
        <th style="text-align: center">상품분류</th>
        <th style="text-align: center">매입가</th>
        <th style="text-align: center">재고수량</th>
        <th style="text-align: center">구매수량</th>
        <th style="text-align: center">구매단위</th>
    </tr>
    </thead>
    <tbody>
        <tr class="no-data">
            <td colspan="10" style="text-align: center;">데이터가 없습니다.</td>
        </tr>
    </tbody>

</table>

<div class="pagination justify-content-center" style="margin-top: 10px">

</div>
</body>

<script type="text/javascript" src="/js/item/itemBuyListForm/init.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/item/itemBuyListForm/excel.js?ver=${currentTime}"></script>