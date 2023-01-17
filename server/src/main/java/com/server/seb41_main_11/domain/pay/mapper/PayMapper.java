package com.server.seb41_main_11.domain.pay.mapper;

import com.server.seb41_main_11.domain.pay.dto.PayDto;
import com.server.seb41_main_11.domain.pay.dto.PayDto.MyPageProgramResponse;
import com.server.seb41_main_11.domain.pay.entity.Pay;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PayMapper {
    Pay PayPostDtoToPay(PayDto.Post requestBody);

    default PayDto.PostResponse PayToPayPostResponseDto(Pay pay) {
        PayDto.PostResponse postResponse = PayDto.PostResponse.of(pay);
        return postResponse;
    }

    default PayDto.GetResponse PayToPayGetResponseDto(Pay pay) {
        PayDto.GetResponse getResponse = PayDto.GetResponse.of(pay);
        return getResponse;
    }
    default List<PayDto.MyPageProgramResponse> ReserveProgramToMyPageProgramResponse(List<Pay> pays) {
        List<PayDto.MyPageProgramResponse> list = new ArrayList<MyPageProgramResponse>(pays.size());

        for(Pay pay : pays) {
            list.add(PayDto.MyPageProgramResponse.of(pay));
        }
        return list;
    }
}
