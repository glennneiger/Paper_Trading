package com.aizixun.papertrading.service;

import java.util.List;

import com.aizixun.papertrading.entity.Holding;

public interface HoldingService {
	public List<Holding> findAll(); 
	public Holding findById(int id);
	public void save(Holding holding);
	public void deleteById(int id); 
}
