function animaster() {

    let _timers = [];
    let _steps = [];

    const _resetFadeIn = (element) => {
        element.style.transitionDuration = null;
        element.classList.add('hide');
        element.classList.remove('show');
    }
    const _resetFadeOut = (element) => {
        element.style.transitionDuration = null;
        element.classList.remove('hide');
        element.classList.add('show');
    }
    const _resetMoveAndScale = (element) => {
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    return {
        fadeIn(element, duration) {
            this.addFadeIn(duration).play(element);
        },
        fadeOut(element, duration) {
            this.addFadeOut(duration).play(element);
        },
        move(element, duration, translation) {
            this.addMove(duration, translation).play(element);
        },
        scale(element, duration, ratio) {
            this.addScale(duration, ratio).play(element);
        },
        moveAndHide(element, duration) {
            this.addMove(duration * 0.4, {x: 100, y: 20})
                .addFadeOut(duration * 0.6)
                .play(element);
        },
        resetMoveAndHide(element) {
            _resetFadeOut(element);
            _resetMoveAndScale(element);
        },
        showAndHide(element, duration) {
            this.addFadeIn(duration / 3)
                .addDelay(duration / 3)
                .addFadeOut(duration / 3)
                .play(element);
        },
        heartBeating(element) {
            return this.addScale(500, 1.4)
                .addDelay(500)
                .addScale(500, 1)
                .play(element, true);
        },


        addMove(duration, translation) {
            _steps.push({
                operation: 'move',
                duration: duration,
                parameter: translation
            });
            return this;
        },
        addScale(duration, ratio) {
            _steps.push({
                operation: 'scale',
                duration: duration,
                parameter: ratio
            });
            return this;
        },
        addFadeIn(duration) {
            _steps.push({
                operation: 'fadeIn',
                duration: duration,
            });
            return this;
        },
        addFadeOut(duration) {
            _steps.push({
                operation: 'fadeOut',
                duration: duration,
            });
            return this;
        },
        addDelay(duration) {
            _steps.push({
                operation: 'delay',
                duration: duration,
            })
            return this;
        },

        play(element, cycled = false) {
            let stop;
            if (cycled) {
                stop = setInterval(() => {
                    let totalDelay = 0;
                    for (const step of _steps) {
                        const timer = setTimeout(() => {
                            switch (step.operation) {
                                case 'move':
                                    element.style.transitionDuration = `${step.duration}ms`;
                                    element.style.transform = getTransform(step.parameter, null);
                                    break;
                                case 'scale':
                                    element.style.transitionDuration = `${step.duration}ms`;
                                    element.style.transform = getTransform(null, step.parameter);
                                    break;
                                case 'fadeIn':
                                    element.style.transitionDuration = `${step.duration}ms`;
                                    element.classList.remove('hide');
                                    element.classList.add('show');
                                    break;
                                case 'fadeOut':
                                    element.style.transitionDuration = `${step.duration}ms`;
                                    element.classList.add('hide');
                                    element.classList.remove('show');
                                    break;
                                case 'delay':
                                    setTimeout(() => {
                                    }, step.duration);
                                    break;
                                default:
                                    break;
                            }
                        }, totalDelay);

                        _timers.push(timer);
                        totalDelay += step.duration;
                    }
                }, _steps.map(x => x.duration).reduce((a, b) => a + b, 0))

            }
            else {
                let totalDelay = 0;
                for (const step of _steps) {
                    const timer = setTimeout(() => {
                        switch (step.operation) {
                            case 'move':
                                element.style.transitionDuration = `${step.duration}ms`;
                                element.style.transform = getTransform(step.parameter, null);
                                break;
                            case 'scale':
                                element.style.transitionDuration = `${step.duration}ms`;
                                element.style.transform = getTransform(null, step.parameter);
                                break;
                            case 'fadeIn':
                                element.style.transitionDuration = `${step.duration}ms`;
                                element.classList.remove('hide');
                                element.classList.add('show');
                                break;
                            case 'fadeOut':
                                element.style.transitionDuration = `${step.duration}ms`;
                                element.classList.add('hide');
                                element.classList.remove('show');
                                break;
                            case 'delay':
                                setTimeout(() => {}, step.duration);
                                break;
                            default:
                                break;
                        }
                    }, totalDelay);

                    _timers.push(timer);
                    totalDelay += step.duration;
                }
            }
            return {
                stop() {
                    if (stop !== null)
                        clearInterval(stop);
                },
                reset() {

                }
            }
        }
    }
}

let heartBeatingId;
addListeners();

function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            // animaster().move(block, 1000, {x: 100, y: 10});
            animaster()
                .addMove(200, {x: 40, y: 40})
                .addScale(800, 1.3)
                .addMove(200, {x: 80, y: 0})
                .addScale(800, 1)
                .addMove(200, {x: 40, y: -40})
                .addScale(800, 0.7)
                .addMove(200, {x: 0, y: 0})
                .addScale(800, 1)
                .play(block);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 5000);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().resetMoveAndHide(block);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 5000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heartBeatingId = animaster().heartBeating(block);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            if (heartBeatingId !== null)
                heartBeatingId.stop();
        });
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
