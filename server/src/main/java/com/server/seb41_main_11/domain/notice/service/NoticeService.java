package com.server.seb41_main_11.domain.notice.service;

import com.server.seb41_main_11.domain.common.CustomBeanUtils;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.notice.entity.Notice;
import com.server.seb41_main_11.domain.notice.repository.NoticeRepository;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {
    // ----------------- DI ---------------------
    private final NoticeRepository noticeRepository;
    private final MemberService memberService;
    // ----------------- DI ---------------------

    // 공지 등록
    public Notice create(Notice notice) {
        Member member = memberService.findVerifiedMemberByMemberId(notice.getMember().getMemberId());

        if (!member.getRole().equals(Role.ADMIN)) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ADMIN);
        } else {
            notice.setMember(member);
            notice.setWriter(member.getMemberName());
            return noticeRepository.save(notice);
        }
    }

    // 공지 수정
    public Notice update(Notice notice) {
        Notice findNotice = findVerifiedNotice(notice.getNoticeId());
        String memberName = findNotice.getMember().getMemberName();

        findNotice.update(notice.getTitle(), notice.getContent());

        return noticeRepository.save(findNotice);
    }

    // 공지 1건 조회
    @Transactional(readOnly = true)
    public Notice find(long noticeId) {
        Notice notice = findVerifiedNotice(noticeId);

        String writer = notice.getMember().getMemberName();
        notice.setWriter(writer);
        updateViews(noticeId);

        return notice;
    }

    // 공지 전체 조회
    @Transactional(readOnly = true)
    public Page<Notice> findAll(int page, int size) {
        Page<Notice> pageNotice = noticeRepository.findAll(PageRequest.of(page, size, Sort.by("noticeId").descending()));
        List<Notice> listNotice = pageNotice.getContent();

        for (Notice a : listNotice) {
            a.getMember().getMemberName();
        }

        return pageNotice;
    }

    // 공지 삭제
    public void delete(long noticeId) {

        Notice notice = findVerifiedNotice(noticeId);

        if (!notice.getMember().getRole().equals(Role.ADMIN)) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ADMIN);
        } else {
            noticeRepository.deleteById(noticeId);
        }
    }

    // 조회수 증가 로직
    public void updateViews(Long id) {
        noticeRepository.updateViews(id);
    }

    // 공지 검증
    public Notice findVerifiedNotice(long noticeId) {
        Optional<Notice> optNotice = noticeRepository.findById(noticeId);

        return optNotice.orElseThrow(() -> new EntityNotFoundException("글이 없습니다"));
    }
}
