package com.example.services;

import com.example.bean.Persistance;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class SeriesServicesStub implements SeriesServices {
    
    @Autowired
    Persistance per;
    
    
    public SeriesServicesStub() {
    }

    @Override
    public String getSeries(String name, String type) throws SeriesServicesException {
        return per.getSerie(name, type);
    }


    

}
