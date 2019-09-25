package com.aizixun.papertrading.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.aizixun.papertrading.model.StockChartElement;
import com.aizixun.papertrading.model.StockQuote;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service 
public class IEXCloudServiceImpl implements IEXCloudService {
	
	private final WebClient webClient;
	
	@Value("${com.aizixun.papertrading.iex.url}")
	private String url; 
	
	@Value("${com.aizixun.papertrading.iex.token}")
	private String token; 
	
	public IEXCloudServiceImpl() {
		this.webClient = WebClient.builder().baseUrl(url).build();
	}
	
	public Mono<StockQuote> getStockQuote(String stockSymbol) {
		String uri = url +  "/stock/" + stockSymbol + "/quote?token=" + token; 
		return webClient.get()
	            		.uri(uri)
	            		.exchange()
	            		.flatMap(clientResponse -> clientResponse.bodyToMono(StockQuote.class));
	}
	
	public Flux<StockChartElement> getStockChart(String stockSymbol) {
		String uri = url +  "/stock/" + stockSymbol + "/chart/1m?token=" + token; 
		return webClient.get()
                		.uri(uri)
                		.exchange()
                		.flatMapMany(clientResponse -> clientResponse.bodyToFlux(StockChartElement.class));
	}
	
	public String getStockDataString(String stockSymbol) {
		String uri = url + "stock/" + stockSymbol + "/quote?token=" + token; 
		return uri; 
	}
	

}
