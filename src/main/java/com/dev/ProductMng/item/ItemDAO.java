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

    public Map<String, Object> getItemList(Map<String, Object> params) {
        //return sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemList", params);
        Map<String, Object> result = MapUtil.kvPairsToMap(new Object[]{
                "list", sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemList", params),
                "total", sqlSession.selectOne("com.dev.ProductMng.item.ItemDAO.getItemListTotal", params)
        });
        return result;
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

    public Map<String, Object> getItemStockList(Map<String, Object> params) {
        Map<String, Object> result = MapUtil.kvPairsToMap(new Object[]{
                "list", sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemStockList", params),
                "total", sqlSession.selectOne("com.dev.ProductMng.item.ItemDAO.getItemStockListTotal", params)
        });
        return result;
    }

    public void uploadItemStock(Map<String, Object> rowData) {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.uploadItemStock", rowData);
    }

    public Map<String, Object> getItemSellList(Map<String, Object> params) {
        Map<String, Object> result = MapUtil.kvPairsToMap(new Object[]{
                "list", sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemSellList", params),
                "total", sqlSession.selectOne("com.dev.ProductMng.item.ItemDAO.getItemSellListTotal", params)
        });
        return result;
    }

    public void uploadItemSell(Map<String, Object> rowData) {
        sqlSession.insert("com.dev.ProductMng.item.ItemDAO.uploadItemSell", rowData);
    }

    public Map<String, Object> getItemSmartList(Map<String, Object> params) {
        Map<String, Object> result = MapUtil.kvPairsToMap(new Object[]{
                "list", sqlSession.selectList("com.dev.ProductMng.item.ItemDAO.getItemSmartList", params),
                "total", sqlSession.selectOne("com.dev.ProductMng.item.ItemDAO.getItemSmartListTotal", params)
        });
        return result;
    }

    public void updateItem(List<Map<String, Object>> list) {
        sqlSession.update("com.dev.ProductMng.item.ItemDAO.updateItem", list);
    }
}
