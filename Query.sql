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