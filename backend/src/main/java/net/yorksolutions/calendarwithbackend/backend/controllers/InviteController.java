package net.yorksolutions.calendarwithbackend.backend.controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import net.yorksolutions.calendarwithbackend.backend.models.Event;
import net.yorksolutions.calendarwithbackend.backend.models.Invite;
import net.yorksolutions.calendarwithbackend.backend.models.InviteInfo;
import net.yorksolutions.calendarwithbackend.backend.models.User;
import net.yorksolutions.calendarwithbackend.backend.repositories.InviteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/invite")
public class InviteController {
    @Autowired
    InviteRepo repository;

    class InviteOutput extends Event {
        @JsonProperty
        private String hostFullName;
        @JsonProperty
        private String hostUsername;
        @JsonProperty
        private String hostEmail;
        @JsonProperty
        private String attendingStatus;
        @JsonProperty
        private int  qtyInvited;
        @JsonProperty
        private int qtyGoing;

        public InviteOutput(Long id, Long userId, String eventName, String eventDescription, String eventDate, String eventTime, String eventLocation,
                            String lastUpdated, String hostFullName, String hostUsername, String hostEmail, String attendingStatus, int qtyInvited, int qtyGoing) {
            super(id, userId, eventName, eventDescription, eventDate, eventTime, eventLocation, lastUpdated);
            this.hostFullName = hostFullName;
            this.hostUsername = hostUsername;
            this.hostEmail = hostEmail;
            this.attendingStatus = attendingStatus;
            this.qtyInvited = qtyInvited;
            this.qtyGoing = qtyGoing;
        }
    }

    @CrossOrigin
    @GetMapping("/getInvites/{inviteeId}")
    Iterable<InviteOutput> getInvites(@PathVariable Long inviteeId) {
        var invites = repository.findInvitesByInviteeId(inviteeId);
        List<InviteOutput> inviteInfo = new ArrayList<>();
        for (var invite : invites) {
            Event e = (Event) invite[0];
            User u = (User) invite[1];
            Invite i = (Invite) invite[2];
            int qtyInvited = repository.findInvitesByEventId(e.getId()).size();
            int qtyGoing = repository.findInvitesByEventIdAndAttendingStatusEquals(e.getId(), "going").size();
            inviteInfo.add(new InviteOutput(e.getId(), e.getUserId(), e.getEventName(), e.getEventDescription(), e.getEventDate(), e.getEventTime(), e.getEventLocation(),
                    e.getLastUpdated(), u.getFirstName() + " " + u.getLastName(), u.getUsername(), u.getEmail(), i.getAttendingStatus(), qtyInvited, qtyGoing));
        }
        return inviteInfo;
    }

    @CrossOrigin
    @PostMapping("/invite")
    String add(@RequestBody Invite invite) {
        repository.save(invite);
        return "success";
    }

    @CrossOrigin
    @DeleteMapping("/uninvite/{eventId}/{inviteeId}")
    String uninvite(@PathVariable Long eventId, @PathVariable Long inviteeId) {
        repository.deleteByEventIdAndInviteeId(eventId, inviteeId);
        return "success";
    }
    @CrossOrigin
    @GetMapping("/getAllInvites")
    Iterable<Invite> getAllInvites() {
        return repository.findAll();
    }
}
