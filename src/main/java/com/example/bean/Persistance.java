/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.bean;

import com.example.model.Serie;
import com.example.services.SeriesServicesException;

/**
 *
 * @author estudiante
 */
public interface Persistance {
            
    String getSerie(String name, String type) throws SeriesServicesException;

}
