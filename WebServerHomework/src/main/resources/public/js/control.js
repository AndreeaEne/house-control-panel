// Configs
const MIN_TEMP = -10;
const MAX_TEMP = 40;
const TEMP_SCALE = chroma.scale(['0c00ad', '38e4f0', 'ffea00', 'f59218', 'f03818'])
    .domain([MIN_TEMP, MAX_TEMP]);

class State {
    constructor() {
        var self = this; // for closures

        // Cache DOM elements
        this.body = $("body");
        this.card = $('.card-block');

        // Lights
        this.lightsFormInput = $('#lights-form-input');
        this.lightsButton = $('#lights-button');
        this.lightsButton.click(function (event) {
            event.preventDefault();  // Don't send request.
            self.isLightOn = !self.isLightOn;
        });


        // Temperature
        this.temperatureFormInput = $('#temp-form-input');
        this.sliderDiv = $('#temperature-slider');

        noUiSlider.create(this.sliderDiv.get(0), {
            start: self.temperatureFormInput.val(),
            range: {
                min: MIN_TEMP,
                max: MAX_TEMP
            }
        });
        this.slider = this.sliderDiv.get(0).noUiSlider;
        this.temperatureHandler = this.sliderDiv.find('.noUi-handle');

        this.slider.on('slide', function() {
            self.temperature = self.temperature;
        });


        // Visual elements to reflect db status
        this.isLightOn = this.isLightOn;
        this.temperature = this.temperature;
    }

    get isLightOn() {
        return this.lightsFormInput.is(':checked');
    }
    set isLightOn(newValue) {
        this.lightsButton
            .removeClass('btn-primary btn-secondary')
            .addClass(newValue ? 'btn-primary' : 'btn-secondary');

        this.body
            .removeClass('lights-on lights-off')
            .addClass(newValue ? 'lights-on' : 'lights-off');

        this.lightsFormInput.attr('checked', newValue);
    }

    get temperature() {
        return this.slider.get()
    }

    set temperature(newValue) {
        this.temperatureHandler.text(Math.round(newValue));

        var color = TEMP_SCALE(newValue).hex();
        this.card.css('border-color', color);

        this.temperatureFormInput.attr('value', newValue);
    }
}

const state = new State();


$(function () {
    handleCurtains();
});

// Curtains
function handleCurtains() {
    var curtains_buttons = $('.curtains-buttons');
    var formInput = $('#curtains-form-input');

    curtains_buttons.click(function (event) {
        event.preventDefault(); // Don't send request.
    });

    var curt_closed = $('#curt-close');
    var curt_opened = $('#curt-open');
    var setClass = function () {
        $("body").removeClass('curtains-on curtains-off');

        curt_opened.removeClass('btn-primary');
        curt_closed.removeClass('btn-primary');

        var statusClass = formInput.is(':checked') ? 'curtains-on' : 'curtains-off';
        // button_lights.addClass(statusClass);
        $("body").addClass(statusClass);

        if (!formInput.is(':checked')) {
            curt_closed.addClass('btn-primary');
            curt_closed.removeClass('btn-secondary');
        }
        else {
            curt_opened.addClass('btn-primary');
            curt_opened.removeClass('btn-secondary');
        }
    }
    setClass(); // Initialization

    curt_closed.click(function (event) {
        if (!curt_closed.hasClass("btn-primary")) {
            curt_opened.addClass("btn-secondary");
            curt_closed.addClass("btn-primary");
            formInput.attr('checked', !formInput.is(':checked'));  // Invert checked status.
            setClass();
        }
    });

    curt_opened.click(function (event) {
        if (!curt_opened.hasClass("btn-primary")) {
            curt_closed.addClass("btn-secondary");
            curt_opened.addClass("btn-primary");
            formInput.attr('checked', !formInput.is(':checked'));  // Invert checked status.
            setClass();
        }
    });

}

