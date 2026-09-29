package com.portfolio.ecommerce.dto.response;

import com.portfolio.ecommerce.entity.Address;

public record AddressResponse(
        Long id,
        String street,
        String city,
        String state,
        String zipCode,
        String country
) {
    public static AddressResponse from(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getCountry()
        );
    }
}
