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
    Long userId;

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

    public Event(Long id, Long userId, String eventName, String eventDescription, String eventDate, String eventTime, String eventLocation, String lastUpdated) {
        this.id = id;
        this.userId = userId;
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.eventLocation = eventLocation;
        this.lastUpdated = lastUpdated;
    }

    public Event() {

    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getEventName() {
        return eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public String getEventDate() {
        return eventDate;
    }

    public String getEventTime() {
        return eventTime;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }
}
