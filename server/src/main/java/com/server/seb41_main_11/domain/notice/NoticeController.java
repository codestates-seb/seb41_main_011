package com.server.seb41_main_11.domain.notice;

import com.server.seb41_main_11.domain.common.MultiResponseDto;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notices")
public class NoticeController {
    private final NoticeMapper mapper;
    private final NoticeService noticeService;

    @PostMapping
    public ResponseEntity postNotice(@Valid @RequestBody NoticeDto.Post post) {
        Notice findNotice = noticeService.create(mapper.postToEntity(post));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToResponse(findNotice)), HttpStatus.CREATED);
    }

    @PatchMapping("/{notice-id}")
    public ResponseEntity patchNotice(@PathVariable("notice-id") @Positive long noticeId,
                                @Valid @RequestBody NoticeDto.Patch patch) {
        patch.setNoticeId(noticeId);

        Notice update = noticeService.update(mapper.patchToEntity(patch));

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.entityToResponse(update)), HttpStatus.OK);
    }

    @GetMapping("/{notice-id}")
    public ResponseEntity get(@PathVariable("notice-id") @Positive long noticeId) {
        Notice findNotice = noticeService.find(noticeId);

        return new ResponseEntity(new SingleResponseDto<>(mapper.entityToResponse(findNotice)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAll(@Positive @RequestParam(defaultValue = "1") int page,
                                 @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Notice> pagenotice = noticeService.findAll(page-1, size);
        List<Notice> notices = pagenotice.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.entityToResponses(notices), pagenotice), HttpStatus.OK);
    }

    @DeleteMapping("/{notice-id}")
    public ResponseEntity delete(@PathVariable("notice-id") @Positive long noticeId) {
        noticeService.delete(noticeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
