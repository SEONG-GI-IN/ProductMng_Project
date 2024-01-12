package com.dev.ProductMng.aspectj;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Around;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;


@Aspect
@Component
public class TransactionalAspect {
    // Transactional 동작 확인을 위해 class 생성
    @Around("@annotation(transactional)")
    public Object applyTransaction(ProceedingJoinPoint joinPoint, Transactional transactional) throws Throwable {
        boolean isTransaction = TransactionSynchronizationManager.isActualTransactionActive();
        Logger log = LoggerFactory.getLogger(joinPoint.getTarget().getClass());
        try {
            if (isTransaction) {
                log.debug("Transaction started.");
            }
            Object result = joinPoint.proceed();
            if (isTransaction) {
                log.debug("Transaction committed.");
            }
            return result;
        } catch (Exception e) {
            if (isTransaction) {
                log.debug("Transaction rolled back.");
            }
            throw e;
        }
    }
}