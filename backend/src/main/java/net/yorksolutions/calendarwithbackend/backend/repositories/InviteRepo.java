package net.yorksolutions.calendarwithbackend.backend.repositories;

import net.yorksolutions.calendarwithbackend.backend.models.Event;
import net.yorksolutions.calendarwithbackend.backend.models.Invite;
import net.yorksolutions.calendarwithbackend.backend.models.InviteInfo;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InviteRepo extends CrudRepository<Invite, Long> {
    @Query("select e, u, i from Event e inner join User u on e.userId = u.id inner join Invite i on i.eventId = e.id where i.inviteeId = :inviteeId")
    Iterable<Object[]> findInvitesByInviteeId(@Param("inviteeId") Long inviteeId);

    List<Invite> findInvitesByEventId(Long eventId);

    List<Invite> findInvitesByEventIdAndAttendingStatusEquals(Long eventId, String attendingStatus);

    @Modifying
    @Transactional
    void deleteByEventIdAndInviteeId(Long eventId, Long inviteeId);

    @Modifying
    @Transactional
    @Query("delete from Invite i where i.eventId = :eventId and i.inviteeId = :inviteeId")
    void deleteInvite(@Param("eventId") Long eventId, @Param("inviteeId") Long inviteeId);

    @Modifying
    @Transactional
    void deleteAllByEventId(Long eventId);
}
