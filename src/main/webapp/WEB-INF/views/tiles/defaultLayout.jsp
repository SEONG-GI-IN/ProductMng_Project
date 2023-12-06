<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="tiles"   uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring"  uri="http://www.springframework.org/tags"  %>

<!DOCTYPE html>
<html>
<head>
<tiles:insertAttribute name="css"/>
</head>
<body>
<tiles:insertAttribute name="script"/>

<div class="tiles-all">
    <tiles:insertAttribute name="nav-top"/>
    <div class="tiles-middle">
        <div>
        <tiles:insertAttribute name="nav-left"/>
        </div>
        <div>
        <tiles:insertAttribute name="body"/>
        </div>
    </div>
</div>
</body>

</html>

