package com.aizixun.papertrading.model;

import java.util.List;

import com.aizixun.papertrading.service.IEXCloudService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class MarketSnapshot {
	private StockQuote[] stockQuote;
	private List<StockChartElement>[] stockChart;
	private String[] listOfSymbol;

	public MarketSnapshot(IEXCloudService iexCloudService) {
		listOfSymbol = new String[] {"QQQ", "DIA", "SPY"};
		
		stockQuote = new StockQuote[3];
		stockChart = new List[3]; 
		for(int i = 0; i < 3; i++) {
			stockQuote[i] = iexCloudService.getStockQuote(listOfSymbol[i]).block();
			stockChart[i] = iexCloudService.getStockChart(listOfSymbol[i]).collectList().block();
		}
	}

	public String[] getListOfSymbol() {
		return listOfSymbol;
	}

	public StockQuote[] getStockQuote() {
		return stockQuote;
	}

	public List<StockChartElement>[] getStockChart() {
		return stockChart;
	}

}
