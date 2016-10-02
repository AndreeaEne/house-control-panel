package com.ade.model;


import org.json.JSONException;
import org.json.JSONObject;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class RoomState {

    private final String path = "src/main/resources/roomstate.json";
    private JSONObject json;

    public RoomState() throws JSONException, IOException {
        String text = new String(Files.readAllBytes(Paths.get(path)), StandardCharsets.UTF_8);
        json = new JSONObject(text);
    }

    // Getters
    public boolean getLight() throws JSONException {
        return json.getBoolean("isLightOn");
    }
    public int getCurtains() throws JSONException {
        return json.getInt("curtainsStatus");
    }
    public double getTemperature() throws JSONException {
        return json.getDouble("temperature");
    }

    // Setters
    public void setLight(boolean light) throws JSONException, FileNotFoundException, UnsupportedEncodingException {
        this.json.put("isLightOn", light);
        saveToDisk();
    }
    public void setCurtains(int curtains) throws JSONException, FileNotFoundException, UnsupportedEncodingException {
        this.json.put("curtainsStatus", curtains);
        saveToDisk();
    }
    public void setTemperature(double temperature) throws JSONException, FileNotFoundException, UnsupportedEncodingException {
        this.json.put("temperature", temperature);
        saveToDisk();
    }

    private void saveToDisk() throws FileNotFoundException, UnsupportedEncodingException {
        PrintWriter writer = new PrintWriter(path, "UTF-8");
        writer.write(json.toString());
        writer.close();
    }
}
