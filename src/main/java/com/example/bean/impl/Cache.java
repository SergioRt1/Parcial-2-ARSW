/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.bean.impl;

import com.example.HttpConnection;
import com.example.bean.Persistance;
import com.example.services.SeriesServicesException;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

/**
 *
 * @author estudiante
 */
@Service
public class Cache implements Persistance {

    Map<String, String> cache = new ConcurrentHashMap<>();

    public Cache() {
    }
    
    @Override
    public String getSerie(String name, String type) throws SeriesServicesException {
        if (cache.containsKey(name)) {
            return cache.get(name);
        } else {
            try {
                String serie = HttpConnection.getSerieHttp(name, type);
                cache.put(name, serie);
                return serie;
            } catch (IOException ex) {
                throw new SeriesServicesException("Error al obtener del API externo.");
            }
        }
    }
}
