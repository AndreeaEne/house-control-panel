package com.ade.controller;

import com.ade.model.RoomState;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RoomController {

    private static RoomState roomState = new RoomState();

    @GetMapping("/room-state")
    public String controlShow(Model model) {
        model.addAttribute("roomstate", roomState);
        return "room-state";
    }

    @PostMapping("/room-state")
    public String controlSubmit(@ModelAttribute RoomState roomstate) {
        roomState.setLight(roomstate.getLight());
        roomState.setCurtains(roomstate.getCurtains());
        roomState.setTemperature(roomstate.getTemperature());
        return "redirect:/room-state";
    }

}
