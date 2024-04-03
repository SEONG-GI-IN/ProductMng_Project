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
</head>
<body>
<div class="page-title">
    <h4>[스마트 상품관리화면]</h4>
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
    <input type="button" id="addBtn" value="등록" />
    <input type="button" id="delBtn" value="삭제" />
    <input type="button" id="updateBtn" value="수정" />
    <input type="button" id="uploadBtn" value="엑셀업로드" />
    <input type="button" id="excelBtn" value="엑셀다운" />
</div>
<!-- toast grid -->
<div id="grid" class="grid-class"></div>

<!-- MODAL -->
<div class="modal fade" id="addDialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <form class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">상품 등록</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- 상품명 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">상품명</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="itemNm" />
                    </div>
                </div>
                <!-- 상품가격 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">매입가</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="purchasePrice"/>
                    </div>
                </div>
                <!-- 상품분류 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">상품분류</label>
                    <div class="col-sm-9 ml-60">
                        <select id="itemTypeCdDiv" class="form-select" style="width: 150px">
                            <option value="">전체</option>
                            <c:forEach var="item" items="${itemTypeList}">
                                <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
                <!-- 거래처 입력 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">거래처</label>
                    <div class="col-sm-9 ml-60">
                        <select id="supplierCdDiv" class="form-select" style="width: 150px">
                            <option value="">전체</option>
                            <c:forEach var="item" items="${supplierList}">
                                <option value="${item.CODE_CD}">${item.CODE_NM}</option>
                            </c:forEach>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                <button type="button" id="saveBtn" class="btn btn-primary">저장</button>
            </div>
        </form>
    </div>
</div>

<div class="modal fade" id="uploadDialog" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <form class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">상품 업로드</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- 엑셀 양식 다운로드 링크 추가 -->
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">양식 다운로드</label>
                    <div class="col-sm-9 ml-60"> <!-- text-align 스타일 직접 적용 -->
                        <input type="button" class="form-control" name="downTemplate" value="양식다운로드" />
                    </div>
                </div>

                <!-- 엑셀파일 업로드 -->
                    <div class="mb-3 row">
                        <label class="col-sm-4 col-form-label">엑셀파일</label>
                        <div class="col-sm-9 ml-60">
                            <input type="file" class="form-control" name="excelFile" id="file" />
                        </div>
                    </div>
                    <!-- 업로드 결과 -->
                    <div class="mb-3 row">
                        <label class="col-sm-4 col-form-label">업로드 결과</label>
                        <div class="col-sm-9 ml-60">
                            <textarea id="uploadResult" class="form-control" rows="5" readonly></textarea>
                        </div>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                <button type="button" id="uploadBtn" class="btn btn-primary">업로드</button>
            </div>
        </form>
    </div>
</div>

</body>

<script type="text/javascript" src="/js/item/itemSmartListForm/grid.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/item/itemSmartListForm/init.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/item/itemSmartListForm/excel.js?ver=${currentTime}"></script>