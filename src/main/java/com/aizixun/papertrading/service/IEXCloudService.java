package com.aizixun.papertrading.service;

import com.aizixun.papertrading.model.MarketSnapshot;
import com.aizixun.papertrading.model.StockChartElement;
import com.aizixun.papertrading.model.StockInfo;
import com.aizixun.papertrading.model.StockQuote;
import com.aizixun.papertrading.model.StockStats;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IEXCloudService {
	public Mono<StockQuote> getStockQuote(String stockSymbol);
	public Mono<StockStats> getStockStats(String stockSymbol);
	public StockInfo getStockInfo(String stockSymbol); 
	public Flux<StockChartElement> getStockChart(String stockSymbol);
	public String getStockDataString(String stockSymbol);
	public MarketSnapshot getMarketSnapshot(String token);
}
