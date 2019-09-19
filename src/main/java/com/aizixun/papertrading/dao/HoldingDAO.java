package com.aizixun.papertrading.dao;

import java.util.List;

import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.entity.User;

public interface HoldingDAO {
	public List<Holding> findAll(); 
	public Holding findById(int id);
	public void save(Holding holding);
	public void deleteById(int id); 
}
