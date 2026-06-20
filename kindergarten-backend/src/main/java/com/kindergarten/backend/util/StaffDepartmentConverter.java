package com.kindergarten.backend.util;

import com.kindergarten.backend.enums.StaffDepartment;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StaffDepartmentConverter implements Converter<String, StaffDepartment> {

    @Override
    public StaffDepartment convert(String source) {
        return StaffDepartment.fromSlug(source);
    }
}
