<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="<c:url value='/css/common.css' />" rel="stylesheet">
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <script src="/js/bootstrap.5.2.3.js" crossorigin="anonymous"></script>
    <!-- Bootstrap JavaScript and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
</head>
<body>
<div id="productDetailPopup" style="overflow: hidden;">
    <div class="popup-content">
        <div class="row">
            <div class="col-md-6">
                <h1></h1>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <label class="form-label">바코드</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" name="barCode" class="form-control" value="${params.barCode}" disabled>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <label class="form-label">상품명</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" name="itemNm" class="form-control" value="${params.itemNm}">
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <label class="form-label">상품분류</label>
                    </div>
                    <div class="col-md-8">
                        <select id="itemTypeCdDiv" class="form-select" style="width: 150px">
                            <option value="${params.itemTypeCd}">${params.itemTypeNm}</option>
                            <c:forEach var="item" items="${itemTypeList}">
                                <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <label class="form-label">판매가</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" name="itemPrice" class="form-control" value="${params.itemPrice}">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h1></h1>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <label class="form-label">가격표명1</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" name="itemTagNm1" class="form-control" placeholder="8글자 이내" value="${params.itemTagNm1}">
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <label class="form-label">가격표명2</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" name="itemTagNm2" class="form-control" placeholder="10글자 이내" value="${params.itemTagNm2}">
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <label class="form-label">안전재고</label>
                    </div>
                    <div class="col-md-8">
                        <input type="text" name="safeRemainCnt" class="form-control" value="${params.safeRemainCnt}">
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <label class="form-label">재고여부</label>
                    </div>
                    <div class="col-md-8">
                        <input type="radio" name="remainCheckYn" value="Y" checked> Y
                        <input type="radio" name="remainCheckYn" value="N"> N
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-5"></div>
        <div class="col-md-5">
            <button type="button" id="saveBtn" class="btn btn-primary">저장</button>
            <button type="button" id="cnclBtn" class="btn btn-secondary ms-2">취소</button>
        </div>
    </div>
</div>

</body>

<script type="text/javascript" src="/js/item/itemDtlForm/init.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/item/itemListForm/grid.js?ver=${currentTime}"></script>