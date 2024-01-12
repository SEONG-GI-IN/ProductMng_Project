/* CREATE SCHEMA [PRODUCT] */
CREATE SCHEMA `product` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;

/* CREATE TABLE [PRODUCT] */
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