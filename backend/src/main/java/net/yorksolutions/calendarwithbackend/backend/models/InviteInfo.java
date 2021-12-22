package net.yorksolutions.calendarwithbackend.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class InviteInfo {
    @JsonProperty
    String creatorUsername;

    @JsonProperty
    String creatorFirstName;

    @JsonProperty
    String creatorLastName;

    @JsonProperty
    String eventName;

    @JsonProperty
    String eventDescription;

    @JsonProperty
    String eventDate;

    @JsonProperty
    String eventTime;

    @JsonProperty
    String eventLocation;

    @JsonProperty
    String lastUpdated;

    @JsonProperty
    String attendingStatus;

    @JsonProperty
    Long inviteId;

    public InviteInfo(String creatorUsername, String creatorFirstName, String creatorLastName, String eventName, String eventDescription, String eventDate, String eventTime, String eventLocation, String lastUpdated, String attendingStatus, Long inviteId) {
        this.creatorUsername = creatorUsername;
        this.creatorFirstName = creatorFirstName;
        this.creatorLastName = creatorLastName;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.eventLocation = eventLocation;
        this.lastUpdated = lastUpdated;
        this.attendingStatus = attendingStatus;
        this.inviteId = inviteId;
    }

    public InviteInfo() {

    }
}
