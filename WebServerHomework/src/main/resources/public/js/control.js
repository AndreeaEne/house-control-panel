// Configs
const MIN_TEMP = -10;
const MAX_TEMP = 40;
const TEMP_SCALE = chroma.scale(['0c00ad', '38e4f0', 'ffea00', 'f59218', 'f03818'])
    .domain([MIN_TEMP, MAX_TEMP]);

class State {
    constructor() {
        var self = this; // for closures

        this.cacheDOMElements();

        // Lights
        this.lightsButton.click(function (event) {
            event.preventDefault();  // Don't send request.
            self.isLightOn = !self.isLightOn;
        });

        // Curtains
        $('.curtains-buttons .btn').click(function (event) {
            event.preventDefault();  // Don't send request.
            var target = $(event.target);
            self.curtainsStatus = target.attr('status');
        });

        // Temperature
        noUiSlider.create(this.sliderDiv.get(0), {
            start: self.sliderDiv.attr('start'),
            range: {
                min: MIN_TEMP,
                max: MAX_TEMP
            }
        });
        this.slider = this.sliderDiv.get(0).noUiSlider;
        this.temperatureHandler = this.sliderDiv.find('.noUi-handle');

        this.slider.on('slide', function () {
            self.temperature = self.temperature;
        });

        this.initialiseVisual();
    }

    cacheDOMElements() {
        // jQuery queries are expensive.
        this.body = $("body");
        this.card = $('.card-block');

        // Lights
        this.lightsButton = $('#lights-button');

        // Curtains


        // Temperature
        this.sliderDiv = $('#temperature-slider');
    }

    initialiseVisual() {
        // Elements have their value from backend
        // but they aren't visually reflected.
        // (eg: page background - black/white)
        this.isLightOn = this.isLightOn;
        this.temperature = this.temperature;
    }

    get isLightOn() {
        return this.lightsButton.hasClass('btn-primary');
    }

    set isLightOn(newValue) {
        this.lightsButton
            .removeClass('btn-primary btn-secondary')
            .addClass(newValue ? 'btn-primary' : 'btn-secondary');

        this.body
            .removeClass('lights-on lights-off')
            .addClass(newValue ? 'lights-on' : 'lights-off');
    }

    get temperature() {
        return this.slider.get()
    }

    set temperature(newValue) {
        this.temperatureHandler.text(Math.round(newValue));

        var color = TEMP_SCALE(newValue).hex();
        this.card.css('border-color', color);
    }

    get curtainsStatus() {
        var status = $('.curtains-buttons .btn-primary').attr('status');
        return +status; // toNumber
    }

    set curtainsStatus(newValue) {
        $('.curtains-buttons .btn').removeClass('btn-primary btn-secondary');

        $('.curtains-buttons .btn').each(function (index, button) {
            $(button).addClass(index == newValue ? 'btn-primary' : 'btn-secondary');
        })

    }
}

const state = new State();
