package com.ade.model;

public class RoomState {

    // TODO read from filesystem
    private boolean light = true;
    private boolean curtains = false;
    private int temperature = -10;

    // Getters
    public boolean getLight()  {return  light;}
    public boolean getCurtains() {return  curtains;}
    public int getTemperature()  {return  temperature;}

    // Setters
    public void setLight(boolean light) {this.light = light;}
    public void setCurtains(boolean curtains) {this.curtains = curtains;}
    public void setTemperature(int temperature) {this.temperature = temperature;}

}

