package com.ade.model;

public class RoomState {

    // TODO read from filesystem
    private boolean light = true;
    private int curtains = 1;  // TODO int
    private float temperature = 20;  // TODO float

    // Getters
    public boolean getLight()  {return  light;}
    public int getCurtains() {return  curtains;}
    public float getTemperature()  {return  temperature;}

    // Setters
    public void setLight(boolean light) {this.light = light;}
    public void setCurtains(int curtains) {this.curtains = curtains;}
    public void setTemperature(float temperature) {this.temperature = temperature;}

}

