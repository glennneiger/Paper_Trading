package com.aizixun.papertrading.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aizixun.papertrading.dao.HoldingDAO;
import com.aizixun.papertrading.entity.Holding;

@Service
public class HoldingServiceImpl implements HoldingService {

	private HoldingDAO holdingDAO; 
	
	@Autowired
	public HoldingServiceImpl(HoldingDAO holdingDAO) {
		this.holdingDAO = holdingDAO; 
	}
	
	
	@Override
	@Transactional
	public List<Holding> findAll() {
		return holdingDAO.findAll();
	}

	@Override
	@Transactional
	public Holding findById(int id) {
		return holdingDAO.findById(id);
	}
	
	@Override
	@Transactional
	public List<Holding> findByUserId(int userId){
		return holdingDAO.findByUserId(userId);
	}

	@Override
	@Transactional
	public void save(Holding holding) {
		holdingDAO.save(holding);
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		holdingDAO.deleteById(id);
	}

}
