package com.aizixun.papertrading.service;

import com.aizixun.papertrading.model.StockChartElement;
import com.aizixun.papertrading.model.StockQuote;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IEXCloudService {
	public Mono<StockQuote> getStockQuote(String stockSymbol);
	public Flux<StockChartElement> getStockChart(String stockSymbol);
	public String getStockDataString(String stockSymbol);
}
