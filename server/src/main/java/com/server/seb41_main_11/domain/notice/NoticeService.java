package com.server.seb41_main_11.domain.notice;

import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.post.Post;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final MemberService memberService;
    private final CustomBeanUtils<Notice> beanUtils;

    public Notice create(Notice notice) {
        Member member = memberService.findMemberByMemberId(notice.getMember().getMemberId());

        if (!member.getRole().equals(Role.ADMIN)) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ADMIN);
        } else {
            notice.setMember(member);
            return noticeRepository.save(notice);
        }
    }

    public Notice update(Notice notice) {
        Notice findNotice = findVerifiedNotice(notice.getNoticeId());

        Notice updatedNotice = beanUtils.copyNonNullProperties(notice, findNotice);

        return noticeRepository.save(updatedNotice);
    }

    @Transactional(readOnly = true)
    public Notice find(long noticeId) {

        return findVerifiedNotice(noticeId);
    }

    @Transactional(readOnly = true)
    public Page<Notice> findAll(int page, int size) {
        return noticeRepository.findAll(PageRequest.of(page, size, Sort.by("noticeId").descending()));
    }

    public void delete(long noticeId) {
        noticeRepository.deleteById(noticeId);
    }

    public Notice findVerifiedNotice(long noticeId) {
        Optional<Notice> optNotice = noticeRepository.findById(noticeId);

        return optNotice.orElseThrow(() -> new EntityNotFoundException("글이 없습니다"));
    }
}
