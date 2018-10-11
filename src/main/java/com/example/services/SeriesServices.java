/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.services;

import com.example.model.Serie;
import java.util.Collection;
import java.util.Set;

/**
 *
 * @author hcadavid
 */

public interface SeriesServices {;

    String getSeries(String name, String type) throws SeriesServicesException;
    
}
