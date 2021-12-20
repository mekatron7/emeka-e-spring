package net.yorksolutions.calendarwithbackend.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    Long id;

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

    public Event(String eventName, String eventDescription, String eventDate, String eventTime, String eventLocation, String lastUpdated) {
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.eventLocation = eventLocation;
        this.lastUpdated = lastUpdated;
    }

    public Event() {

    }
}
