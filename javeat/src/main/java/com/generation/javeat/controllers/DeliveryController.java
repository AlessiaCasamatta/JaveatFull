package com.generation.javeat.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.generation.javeat.model.dto.delivery.DeliveryDtoResponse;
import com.generation.javeat.model.dto.delivery.DeliveryInstRqstDto;
import com.generation.javeat.model.dto.deliveryStat.DeliverySummaryByWeekDto;
import com.generation.javeat.model.dtoservices.DeliveryConverter;
import com.generation.javeat.model.entities.Delivery;
import com.generation.javeat.model.entities.DishToDelivery;
import com.generation.javeat.model.entities.Restaurant;
import com.generation.javeat.model.repositories.DeliveryRepository;
import com.generation.javeat.model.repositories.DishToDeliveryRepository;
import com.generation.javeat.model.repositories.RestaurantRepository;

import io.swagger.v3.oas.annotations.Operation;

@RestController
public class DeliveryController {
    @Autowired
    DeliveryRepository repo;
    @Autowired
    DeliveryConverter conv;
    @Autowired
    DishToDeliveryRepository repoDishToDelivery;
    @Autowired
    RestaurantRepository rRepo;

    @GetMapping("/deliveries/{id}")
    @Operation(description = "Leggo una delivery tramite ID")
    public Delivery getOne(@PathVariable Integer id) {
        return repo.findById(id).get();
    }

    @Operation(description = "Leggo un ordine tramite ID dell' User")
    @GetMapping("/myorders/{id}")
    public List<DeliveryDtoResponse> getAll(@PathVariable Integer id) {
        return repo.findAll().stream().filter(e -> e.getUser().getId() == id).map((f -> conv.deliveryDtoResponse(f)))
                .toList();
    }

    @Operation(description = "Leggo un ordine tramite ID dell' Owner")
    @GetMapping("/myorders/statistic/{id}")
    public List<DeliverySummaryByWeekDto> getOrdersByWeekStatistic(@PathVariable Integer id) {
        List<Delivery> deliveries = repo.findAll().stream().filter(f-> f.getRestaurant().getOwner().getId()==id).toList();
        Restaurant rest = rRepo.findAll().stream().filter(r -> r.getOwner().getId() == id).toList().get(0);
        return conv.convertToOrderSummaryByWeek(deliveries, rest);
    }

    // Metodo per post Delivery
    @Operation(description = "Inserisco una delivery o ordine nel DB")
    @PostMapping("/deliveries")
    public ResponseEntity<?> insert(@RequestBody DeliveryInstRqstDto dto) {
        Delivery op = conv.deliveryDtoRqstDelivery(dto);

        return ResponseEntity.ok(repo.save(op));

    }

    @Operation(description = "Cancello un ordine tramite ID dal DB")
    @DeleteMapping("/deliveries/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Delivery> op = repo.findById(id);
        if (op.isPresent()) {
            Delivery delivery = op.get();
            for (DishToDelivery dishToDelivery : delivery.getDishesDeliveries()) {
                dishToDelivery.setDelivery(null);
                repoDishToDelivery.delete(dishToDelivery);
            }
            repo.deleteById(id);

            return new ResponseEntity<String>("", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("No delivery with id " + id, HttpStatus.NOT_FOUND);
        }
    }

}
