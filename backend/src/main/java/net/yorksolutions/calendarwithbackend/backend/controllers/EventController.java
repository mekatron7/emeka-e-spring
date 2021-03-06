package net.yorksolutions.calendarwithbackend.backend.controllers;

import net.yorksolutions.calendarwithbackend.backend.models.Event;
import net.yorksolutions.calendarwithbackend.backend.repositories.EventRepo;
import net.yorksolutions.calendarwithbackend.backend.repositories.InviteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
public class EventController {
    @Autowired
    EventRepo repository;
    @Autowired
    InviteRepo inviteRepository;

    @CrossOrigin
    @PostMapping("/add")
    String add(@RequestBody Event event) {
        repository.save(event);
        return "💯";
    }

    @CrossOrigin
    @GetMapping("/getEvents/{id}")
    Iterable<Event> getEvents(@PathVariable Long id) {
        return repository.findByUserId(id);
    }

    @CrossOrigin
    @PutMapping("/edit")
    String edit(@RequestBody Event editedEvent) {
        repository.findById(editedEvent.getId()).orElseThrow();
        repository.save(editedEvent);
        return "💯";
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    String delete(@PathVariable Long id) {
        repository.findById(id).orElseThrow();
        repository.deleteById(id);
        inviteRepository.deleteAllByEventId(id);
        return "💯";
    }
}
