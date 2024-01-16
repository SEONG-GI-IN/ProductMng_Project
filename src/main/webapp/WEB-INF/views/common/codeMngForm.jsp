<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%>

<head>
    <link rel="stylesheet" type="text/css" href="/css/list.css" />
    <link rel="stylesheet" href="/css/tui-grid.css" type="text/css" />
    <script src="/js/tui-grid.js"></script>
</head>
<body>
<div class="page-title">
    <h4>[공통 코드 관리 화면]</h4>
</div>

<div class="twinbox" style="width: 100%">
    <!-- toast grid -->
    <table style="width: 95%">
        <colgroup>
            <col width="50%">
            <col width="50%">
        </colgroup>
        <tbody>
        <tr>
            <td>
                <div class="btn_div">
                    <div class="right_div">
                        <input type="button" id="addBtn" value="추가" />
                        <input type="button" id="delete" value="삭제" />
                    </div>
                </div>
                <div id="grid" class="grid-class"></div>
            </td>
            <td>
                <div class="btn_div">
                    <div class="right_div">
                        <input type="button" id="addSubBtn" value=추가 />
                        <input type="button" id="deleteSubBtn" value="삭제" />
                    </div>
                </div>
                <div id="subGrid" class="grid-class"></div>
            </td>
        </tbody>
    </table>
</div>

<!-- MODAL -->
<div class="modal fade" id="addDialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <form class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">그룹 코드 등록</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">그룹코드</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="upCodeCd" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">그룹명</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="upCodeNm" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">비고</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="remark" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">정렬</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="orderBy" />
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

<!-- SUB MODAL -->
<div class="modal fade" id="subDialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <form class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">코드 등록</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">코드</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="codeCd" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">코드명</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="codeNm" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">비고</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="codeRemark" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">정렬</label>
                    <div class="col-sm-9 ml-60">
                        <input type="text" class="form-control" name="codeOrderBy" />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                <button type="button" id="saveSubBtn" class="btn btn-primary">저장</button>
            </div>
        </form>
    </div>
</div>

</body>

<script type="text/javascript" src="/js/common/codeMngForm/grid.js?ver=${currentTime}"></script>
<script type="text/javascript" src="/js/common/codeMngForm/init.js?ver=${currentTime}"></script>