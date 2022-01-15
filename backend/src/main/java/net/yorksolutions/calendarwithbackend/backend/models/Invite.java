package net.yorksolutions.calendarwithbackend.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@IdClass(InviteId.class)
public class Invite {
    @Id
    @JsonProperty
    Long eventId;

    @Id
    @JsonProperty
    Long inviteeId;

    @JsonProperty
    String attendingStatus;

    public Invite() {

    }

    public String getAttendingStatus() {
        return attendingStatus;
    }
}
