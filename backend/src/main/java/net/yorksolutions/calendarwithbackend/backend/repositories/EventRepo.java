package net.yorksolutions.calendarwithbackend.backend.repositories;

import net.yorksolutions.calendarwithbackend.backend.models.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepo extends CrudRepository<Event, Long> {
    Iterable<Event> findByUserId(Long id);
}
