package com.server.seb41_main_11.domain.program.entity;

import com.server.seb41_main_11.domain.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long programId;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false)
    private String content;

    private int userMax;

    private int userCount = 0;

    private int cost;

    private String image;

    private String announce;

    private String zoomLink;

    @Column(nullable = false)
    private String dateStart;

    @Column(nullable = false)
    private String dateEnd;

    private SymptomTypes symptomTypes;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }

    public enum SymptomTypes {
        STRESS("스트레스"),
        UNREST("불안"),
        DEPRESSED("우울"),
        ADDICTED("중독");

        @Getter
        private String status;

        SymptomTypes(String status) {
            this.status = status;
        }
    }

    @Builder
    public Program(Long programId, String title, String content, int userMax, int userCount,
        int cost,
        String image, String announce, String zoomLink, String dateStart, String dateEnd) {
        this.programId = programId;
        this.title = title;
        this.content = content;
        this.userMax = userMax;
        this.userCount = userCount;
        this.cost = cost;
        this.image = image;
        this.announce = announce;
        this.zoomLink = zoomLink;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    public static Program of(Program program) {
        return Program.builder()
            .programId(program.getProgramId())
            .title(program.getTitle())
            .content(program.getContent())
            .userMax(program.getUserMax())
            .userCount(program.userCount)
            .cost(program.getCost())
            .image(program.getImage())
            .announce(program.getAnnounce())
            .zoomLink(program.getZoomLink())
            .dateStart(program.getDateStart())
            .dateEnd(program.getDateEnd())
            .build();
    }
}