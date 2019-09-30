package com.aizixun.papertrading.model;

import java.util.ArrayList;
import java.util.List;

import com.aizixun.papertrading.service.IEXCloudService;

public class MarketSnapshot {
	private StockQuote[] stockQuote;
	private List<String> time; 
	private List<Double>[] stockChart; 
	private String[] listOfSymbol;

	public MarketSnapshot(IEXCloudService iexCloudService) {
		listOfSymbol = new String[] {"QQQ", "DIA", "SPY"};
		
		stockQuote = new StockQuote[3];
		List<StockChartElement>[] stockChartElement = new ArrayList[3]; 
		
		for(int i = 0; i < 3; i++) {
			stockQuote[i] = iexCloudService.getStockQuote(listOfSymbol[i]).block();
			stockChartElement[i] = iexCloudService.getStockChart(listOfSymbol[i]).collectList().block();
		}
		
		time = new ArrayList<String>();
		List<Double> QQQ = new ArrayList<Double>();
		List<Double> DIA = new ArrayList<Double>();
		List<Double> SPY = new ArrayList<Double>();
		
		double QQQInit = 0;
		double DIAInit = 0;
		double SPYInit = 0; 
		
		if (stockChartElement[0].size() >= 1) QQQInit = stockChartElement[0].get(0).getClose(); 
		if (stockChartElement[1].size() >= 1) DIAInit = stockChartElement[1].get(0).getClose(); 
		if (stockChartElement[2].size() >= 1) SPYInit = stockChartElement[2].get(0).getClose(); 
		
		for(int i = 0; i < stockChartElement[0].size() && i < stockChartElement[0].size() && i < stockChartElement[0].size(); i++) {
			
			time.add(stockChartElement[0].get(i).getDate());
			
			QQQ.add((stockChartElement[0].get(i).getClose() - QQQInit) / QQQInit);
			DIA.add((stockChartElement[1].get(i).getClose() - DIAInit) / DIAInit);
			SPY.add((stockChartElement[2].get(i).getClose() - SPYInit) / SPYInit);
		}
		
		stockChart = new List[] {QQQ, DIA, SPY}; 
	}

	public StockQuote[] getStockQuote() {
		return stockQuote;
	}

	public List<String> getTime() {
		return time;
	}

	public List<Double>[] getStockChart() {
		return stockChart;
	}

	public String[] getListOfSymbol() {
		return listOfSymbol;
	}

}
