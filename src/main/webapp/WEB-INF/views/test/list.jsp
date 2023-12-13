<head>
    <link rel="stylesheet" type="text/css" href="/css/list.css" />
    <script src="/js/list.js"></script>
</head>
<body>
<div class="list-search">
    <li> 상품검색 </li>
    <table class="list-search-table">
        <tr>
            <td> 등록일 </td>
            <td id="list-search-date">
                <input type="date" class="list-date"/>
                <span> ~ </span>
                <input type="date" class="list-date"/>
            </td>
            <td> 상품구분 </td>
            <td id="list-search-product-class">
                <select>
                    <option value="1"> 구분1 </option>
                    <option value="2"> 구분2 </option>
                    <option value="3"> 구분3 </option>
                </select>
            </td>
            <td> <input type="submit" value="검색"/></td>
        </tr>
    </table>
</div>
</body>
