package com.dev.ProductMng.item;

import com.dev.ProductMng.util.MapUtil;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ItemDAO {
    private final SqlSessionTemplate sqlSession;

    public ItemDAO(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    public void insertItem(Map<String, Object> params) throws Exception{
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.insertItem", params);
    }

    public List<Map<String, Object>> getItemList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemList", params);
    }

    public List<Map<String, Object>> getItemTypeList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemTypeList", params);
    }

    public List<Map<String, Object>> getSupplierList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getSupplierList", params);
    }

    public void uploadItem(Map<String, Object> params) {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.uploadItem", params);
    }

    public void deleteItem(List<Map<String, Object>> list) {
        sqlSession.delete("com.dev.ProductMng.item.ItemDAO.deleteItem", list);
    }

    public List<Map<String, Object>> getItemStockList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemStockList", params);
    }

    public void uploadItemStock(Map<String, Object> rowData) {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.uploadItemStock", rowData);
    }

    public List<Map<String, Object>> getItemSellList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemSellList", params);
    }

    public void uploadItemSell(Map<String, Object> rowData) {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.uploadItemSell", rowData);
    }

    public List<Map<String, Object>> getItemSmartList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemSmartList", params);
    }

    public void updateItem(List<Map<String, Object>> list) {
        sqlSession.update("com.dev.ProductMng.item.ItemDAO.updateItem", list);
    }

    public List<Map<String, Object>> getItemRemainList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemRemainList", params);
    }

    public void updateItemRemainCnt(List<Map<String, Object>> list) {
        sqlSession.update("com.dev.ProductMng.item.ItemDAO.updateItemRemainCnt", list);
    }

    public void updateItemStock(List<Map<String, Object>> list) {
        sqlSession.update("com.dev.ProductMng.item.ItemDAO.updateItemStock", list);
    }

    public List<Map<String, Object>> getCashFlowList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getCashFlowList", params);
    }

    public void updateItemDtl(Map<String, Object> params) {
        sqlSession.update("com.dev.ProductMng.item.ItemDAO.updateItemDtl", params);
    }

    public void insertPriceTag(List<Map<String, Object>> list) {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.insertPriceTag", list);
    }

    public Map<String, Object> getPriceTagList(Map<String, Object> params) {
        Map<String, Object> result = MapUtil.kvPairsToMap(new Object[]{"list", sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getPriceTagList", params),
                "total", sqlSession.selectOne("com.dev.ProductMng.item.ItemDAO.getPriceTagTotal", params),
                "currentPage", params.get("page")});
        return result;
    }

    public void deletePriceTag(List<Map<String, Object>> list) {
        sqlSession.delete("com.dev.ProductMng.item.ItemDAO.deletePriceTag", list);
    }

    public Map<String, Object> getItemBuyList(Map<String, Object> params) {
        Map<String, Object> result = MapUtil.kvPairsToMap(new Object[]{"list", sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemBuyList", params),
                "total", sqlSession.selectOne("com.dev.ProductMng.item.ItemDAO.getItemBuyListTotal", params),
        "currentPage", params.get("page")});
        return result;
    }

    public void insertItemBuyList() {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.insertItemBuyList");
    }

    public void updateSafeRemainCnt(List<Map<String, Object>> list) {
        sqlSession.update("com.dev.ProductMng.item.ItemDAO.updateSafeRemainCnt", list);
    }

    public List<Map<String, Object>> getItemNmList(Map<String, Object> params) {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemNmList", params);
    }

    public void updateItemBuyList(List<Map<String, Object>> list) {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.updateItemBuyList", list);
    }

    public List<Map<String, Object>> getItemBuyList2() {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemBuyList2");
    }

    public List<Map<String, Object>> getItemBuyInfo() {
        return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemBuyInfo");
    }

    public void deleteBuyList(List<Map<String, Object>> delList) {
        sqlSession.delete("com.dev.ProductMng.item.ItemDAO.deleteBuyList", delList);
    }

    public void updateItemBuyList2(List<Map<String, Object>> list) {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.updateItemBuyList2", list);
    }
}
