package com.server.seb41_main_11.controllerTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.google.gson.Gson;
import com.server.seb41_main_11.domain.counselor.service.CounselorService;
import com.server.seb41_main_11.domain.program.controller.ProgramController;
import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.dto.ProgramDto.Post;
import com.server.seb41_main_11.domain.program.mapper.ProgramMapper;
import com.server.seb41_main_11.domain.program.service.ProgramService;
import com.server.seb41_main_11.global.interceptor.AuthenticationInterceptor;
import com.server.seb41_main_11.global.jwt.service.TokenManager;
import java.util.Set;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(value = ProgramController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class ProgramControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProgramService programService;

    @MockBean
    private ProgramMapper programMapper;

    @MockBean
    private CounselorService counselorService;

    @MockBean
    private AuthenticationInterceptor authenticationInterceptor;

    @MockBean
    private TokenManager tokenManager;
    @Autowired
    private Gson gson;
    @Test
    public void postProgramTest() throws Exception {
        ProgramDto.Post post = new ProgramDto.Post(
            "제목",
            "내용",
            "이미지",
            30,
            "시작시간",
            "종료시간",
            30000,
            Set.of(
                "증상1"
            ),
            1L
        );

        String content = gson.toJson(post);

        ResultActions actions =
            mockMvc.perform(
                post("/api/programs/post")
                    .header("Authorization", "Bearer (accessToken)")
                    .accept(MediaType.APPLICATION_JSON)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(content)
            );

        actions
            .andExpect(status().isCreated());
    }
}
