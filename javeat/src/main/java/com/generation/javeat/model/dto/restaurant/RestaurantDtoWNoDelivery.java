package com.generation.javeat.model.dto.restaurant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class RestaurantDtoWNoDelivery extends RestaurantDtoBase
{
   private Integer id; 
   private boolean isOpen; 
   
   
   
   
  

    

}

