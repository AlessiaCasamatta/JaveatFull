package com.generation.javeat.model.dto.user;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserDtoWWithID extends UserDtoBase
{
    private Integer id;
    private boolean owner;

    public void setOwner(boolean owner) {
        this.owner = owner;
    }
}
