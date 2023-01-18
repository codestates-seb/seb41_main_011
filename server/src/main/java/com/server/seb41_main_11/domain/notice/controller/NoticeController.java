package com.server.seb41_main_11.domain.notice.controller;

import com.server.seb41_main_11.domain.common.MultiResponseDto;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.domain.notice.dto.NoticeDto;
import com.server.seb41_main_11.domain.notice.mapper.NoticeMapper;
import com.server.seb41_main_11.domain.notice.service.NoticeService;
import com.server.seb41_main_11.domain.notice.entity.Notice;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notices")
public class NoticeController {
    private final NoticeMapper mapper;
    private final NoticeService noticeService;
    private final MemberService memberService;

    @PostMapping("/post")
    public ResponseEntity postNotice(@Valid @RequestBody NoticeDto.Post post,
                                     HttpServletRequest request) {
        Member member = memberService.getLoginMember(request);

        Notice findNotice = noticeService.create(mapper.postToEntity(post), member);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToSingleResponse(findNotice)), HttpStatus.CREATED);
    }

    @PatchMapping("/patch/{notice-id}")
    public ResponseEntity patchNotice(@PathVariable("notice-id") @Positive long noticeId,
                                      @Valid @RequestBody NoticeDto.Patch patch) {
        patch.setNoticeId(noticeId);

        Notice update = noticeService.update(mapper.patchToEntity(patch));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToSingleResponse(update)), HttpStatus.OK);
    }

    @GetMapping("/lookup/{notice-id}")
    public ResponseEntity get(@PathVariable("notice-id") @Positive long noticeId) {
        Notice findNotice = noticeService.find(noticeId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.entityToSingleResponse(findNotice)), HttpStatus.OK);
    }

    @GetMapping("/lookup/list")
    public ResponseEntity getAll(@Positive @RequestParam(defaultValue = "1") int page,
                                 @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Notice> pageNotice = noticeService.findAll(page-1, size);
        List<Notice> notices = pageNotice.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.entityToMultiResponse(notices), pageNotice), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{notice-id}")
    public ResponseEntity delete(@PathVariable("notice-id") @Positive long noticeId) {
        noticeService.delete(noticeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
