<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page info="INDEX PAGE"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <title> index </title>
    <style>
        .main {
        display: flex;
        }



    </style>
</head>
<body>
<div class="nav-top">
    <%@ include file ="nav-top.jsp" %>
</div>
<div class="main">
    <div class="nav-left">
        <%@ include file ="nav-left.jsp" %>
    </div>
    <div>
        <%=getServletInfo()%>
    </div>
</div>
</body>
</html>