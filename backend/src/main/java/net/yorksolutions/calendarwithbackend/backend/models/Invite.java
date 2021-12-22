package net.yorksolutions.calendarwithbackend.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Invite {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    Long id;

    @JsonProperty
    Long eventId;

    @JsonProperty
    Long inviteeId;

    @JsonProperty
    String attendingStatus;

    public Invite() {

    }
}
