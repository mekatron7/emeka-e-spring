package net.yorksolutions.calendarwithbackend.backend.repositories;

import net.yorksolutions.calendarwithbackend.backend.models.Invite;
import net.yorksolutions.calendarwithbackend.backend.models.InviteInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface InviteRepo extends CrudRepository<Invite, Long> {
    @Query("select e, u, i.attendingStatus, i.id as inviteeId from Event e inner join User u on e.userId = u.id inner join Invite i on i.eventId = e.id where i.inviteeId = :inviteeId")
    Iterable<InviteInfo> findInvitesByInviteeId(@Param("inviteeId") Long inviteeId);
}
