// Configs
const MIN_TEMP = -10;
const MAX_TEMP = 40;
const LOW_TEMP = 0;
const HIGH_TEMP = 30;
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

            self.submit();
        });

        // Curtains
        this.curtainsButtons.click(function (event) {
            event.preventDefault();  // Don't send request.
            var target = $(event.target);
            self.curtainsStatus = target.attr('status');

            self.submit();
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

        this.slider.on('change', function () {
            self.submit();
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
        this.curtainsButtons = $('.curtains-buttons .btn');

        // Temperature
        this.sliderDiv = $('#temperature-slider');
        this.temperatureWarning = $('#temp-warning');
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

    get curtainsStatus() {
        var status = this.curtainsButtons.filter('.btn-primary').attr('status');
        return +status; // toNumber
    }

    set curtainsStatus(newValue) {
        this.curtainsButtons.removeClass('btn-primary btn-secondary');

        this.curtainsButtons.each(function (index, button) {
            $(button).addClass(index == newValue ? 'btn-primary' : 'btn-secondary');
        })

    }

    get temperature() {
        return this.slider.get()
    }

    set temperature(newValue) {
        this.temperatureHandler.text(Math.round(newValue));

        var color = TEMP_SCALE(newValue).hex();
        this.card.css('border-color', color);

        var isLow = newValue < LOW_TEMP,
            isHigh = newValue > HIGH_TEMP;

        if (isLow || isHigh)
            this.temperatureWarning
                .slideDown()
                .find('#type').text(isHigh ? 'high' : 'low');
        else
            this.temperatureWarning.slideUp();
    }

    submit(){
        var self = this;
        $.post('/room-state', {
            isLightOn: self.isLightOn,
            curtainsStatus: self.curtainsStatus,
            temperature: self.temperature
        });
    }
}

const state = new State();
