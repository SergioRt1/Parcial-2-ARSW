/*
 * Copyright (C) 2016 Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.example.restcontrollers;


import com.example.model.Serie;
import org.springframework.web.bind.annotation.RestController;
import com.example.services.SeriesServices;
import com.example.services.SeriesServicesException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Sergio
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/series")
public class APIController {

    @Autowired
    SeriesServices ros;


    @GetMapping("/{name}/{type}")
    public ResponseEntity<?> getOrderHandler(@PathVariable("name") String name,@PathVariable("type") String type) {
        HttpStatus status = HttpStatus.ACCEPTED;
        String serie = null;
        try {
            serie = ros.getSeries(name,type);
        } catch (SeriesServicesException ex) {
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(serie, status);

    }


}
