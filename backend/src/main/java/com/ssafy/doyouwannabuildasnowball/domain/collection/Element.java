package com.ssafy.doyouwannabuildasnowball.domain.collection;

import lombok.Data;

@Data
public class Element {
    private int indicator;
    private float coordinateX;
    private float coordinateY;
    private float coordinateZ;

    public Element (int indicator, float coordinateX, float coordinateY, float coordinateZ) {
        this.indicator = indicator;
        this. coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.coordinateZ = coordinateZ;
    }
}
