/* CREATE SCHEMA [PRODUCT] */
CREATE SCHEMA `product` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;

/* CREATE TABLE [PRODUCT] */ /* 상품 */
create table T_PRODUCT_DTL
(
    BAR_CODE        int         not null primary key ,
    PRODUCT_NAME    varchar(20) null,
    PRODUCT_PRICE   int         null,
    PRODUCT_TYPE_NM     varchar(10) null,
    PRODUCT_TYPE_CD     varchar(10) null,
    SUPPLIER        varchar(30) null,
    PURCHASE_PRICE  int         null,
    UPDATE_DT       datetime    null,
    CREATE_DT       datetime    null
);

/* CREATE TABLE [STOCK] */ /* 재고 */
create table T_STOCK_DTL
(
    BAR_CODE        int      not null,
    REGISTRATION_DT DATETIME null, /* 등록 날짜 */
    PRODUCT_QTY     int      null, /* 수량 */
    constraint t_stock_dtl-t_product_dtl-BAR_CODE_fk
        foreign key (BAR_CODE) references t_product_dtl (BAR_CODE)
            on update cascade
);

-- product.t_code_mst definition

CREATE TABLE `t_code_mst` (
    `UP_CODE_CD` varchar(32) NOT NULL COMMENT '그룹코드',
    `UP_CODE_NM` text NOT NULL COMMENT '그룹코드명',
    `REMARK` text COMMENT '비고',
    `ORDER_BY` int(3) DEFAULT '0' COMMENT '정렬',
    `CODE_CD` varchar(32) NOT NULL COMMENT '코드',
    `CODE_NM` text COMMENT '코드명',
    `CODE_REMARK` text COMMENT '코드 비고',
    `CODE_ORDER_BY` int(3) DEFAULT '0' COMMENT '코드 정렬',
    `CREATE_DT` datetime DEFAULT NULL COMMENT '생성일',
    `UPDATE_DT` datetime DEFAULT NULL COMMENT '변경일',
    PRIMARY KEY (`UP_CODE_CD`,`CODE_CD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='공통 코드 관리 테이블';


-- product.t_item_dtl definition

CREATE TABLE `t_item_dtl` (
    `BAR_CODE` varchar(32) NOT NULL COMMENT '바코드',
    `ITEM_NM` varchar(32) NOT NULL COMMENT '상품명',
    `ITEM_TYPE_CD` varchar(32) NOT NULL COMMENT '상품분류 코드',
    `ITEM_TYPE_NM` varchar(32) NOT NULL COMMENT '상품분류(아이스크림/과자/식품..)',
    `ITEM_PRICE` int(11) NOT NULL COMMENT '판매가',
    `CREATE_DT` datetime DEFAULT NULL COMMENT '생성일자',
    `UPDATE_DT` datetime DEFAULT NULL COMMENT '변경일자',
    PRIMARY KEY (`BAR_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품관리 테이블';


-- product.t_item_sell definition

CREATE TABLE `t_item_sell` (
    `BAR_CODE` varchar(32) NOT NULL COMMENT '바코드',
    `ITEM_NM` varchar(32) NOT NULL COMMENT '상품명',
    `SELL_CNT` int(11) NOT NULL COMMENT '판매량',
    `START_DT` varchar(8) NOT NULL COMMENT '판매 시작일자',
    `END_DT` varchar(8) NOT NULL COMMENT '판매종료일자',
    PRIMARY KEY (`BAR_CODE`,`START_DT`,`END_DT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품 판매 수량 테이블';


-- product.t_item_stock definition

CREATE TABLE `t_item_stock` (
    `BAR_CODE` varchar(32) NOT NULL COMMENT '바코드',
    `ITEM_NM` varchar(32) NOT NULL COMMENT '상품명',
    `STOCK_DT` varchar(8) NOT NULL COMMENT '입고일자',
    `SUPPLIER_CD` varchar(45) NOT NULL COMMENT '거래처 코드',
    `SUPPLIER` varchar(32) NOT NULL COMMENT '거래처',
    `ITEM_TYPE_CD` varchar(32) NOT NULL COMMENT '상품분류 코드',
    `ITEM_TYPE_NM` varchar(32) NOT NULL COMMENT '상품분류',
    `PURCHASE_PRICE` int(11) NOT NULL COMMENT '매입가',
    `IN_CNT` int(11) NOT NULL COMMENT '입고 수량',
    `REMAIN_CNT` int(11) DEFAULT NULL COMMENT '재고 수량',
    `CREATE_DT` datetime DEFAULT NULL,
    `UPDATE_DT` datetime DEFAULT NULL,
    PRIMARY KEY (`BAR_CODE`,`STOCK_DT`,`SUPPLIER_CD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='상품 입고 관리';
