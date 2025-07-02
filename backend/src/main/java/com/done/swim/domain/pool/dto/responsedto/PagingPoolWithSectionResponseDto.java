package com.done.swim.domain.pool.dto.responsedto;

import com.done.swim.domain.pool.entity.Pool;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Objects;

@Getter
@Builder
@ToString
public class PagingPoolWithSectionResponseDto {

    private List<PoolWithSectionResponseDto> pools;
    private int totalPages;
    private boolean hasNext;
    private int pageNumber;


//    public static PagingPoolWithSectionResponseDto from(Pool entity, Long userId) {
//        return PagingPoolWithSectionResponseDto.builder()
//                .id(entity.getId())
//                .address(entity.getAddress())
//                .section(entity.getSection())
//                .name(entity.getName())
//                .latitude(entity.getLatitude())
//                .longitude(entity.getLongitude())
//                .mark(entity.getPoolMarks().stream()
//                        .anyMatch(pm -> Objects.equals(pm.getUser().getId(), userId))
//                )
//                .build();
//    }

    /**
     * 특정 지역구의 수영장 조회 + 유저의 찜 여부
     */
    public static PagingPoolWithSectionResponseDto from(Page<Pool> entities, Long userId) {
        return PagingPoolWithSectionResponseDto.builder()
                .pools(entities.getContent().stream().map(p -> PoolWithSectionResponseDto.from(p, userId)).toList())
                .totalPages(entities.getTotalPages())
                .hasNext(entities.hasNext())
                .pageNumber(entities.getPageable().getPageNumber() + 1)
                .build();
    }
}
