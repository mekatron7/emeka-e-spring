package net.yorksolutions.calendarwithbackend.backend.controllers;

import net.yorksolutions.calendarwithbackend.backend.models.Invite;
import net.yorksolutions.calendarwithbackend.backend.models.InviteInfo;
import net.yorksolutions.calendarwithbackend.backend.repositories.InviteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/invite")
public class InviteController {
    @Autowired
    InviteRepo repository;

    @CrossOrigin
    @GetMapping("/getInvites/{inviteeId}")
    Iterable<InviteInfo> getInvites(@PathVariable Long inviteeId) {
        return repository.findInvitesByInviteeId(inviteeId);
    }

    @CrossOrigin
    @PostMapping("/invite")
    String add(@RequestBody Invite invite) {
        repository.save(invite);
        return "success";
    }

    @CrossOrigin
    @DeleteMapping("/uninvite/{id}")
    String uninvite(@PathVariable Long id) {
        repository.findById(id).orElseThrow();
        repository.deleteById(id);
        return "success";
    }
}
