package net.yorksolutions.calendarwithbackend.backend.controllers;

import net.yorksolutions.calendarwithbackend.backend.repositories.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/event")
public class EventController {
    @Autowired
    EventRepo repository;
}
