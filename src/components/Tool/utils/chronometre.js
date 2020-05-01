export default (id) => {
    const state = {
        tps: 0,
        timer: undefined,
    };

    const $id = document.querySelector(id);
    const setChronometre = (txt) => {
        $id.textContent = txt;
    };
    const start = () => {
        if (state.timer !== undefined) {
            return false;
        }
        state.tps = 0;
        state.timer = setInterval(function () {
            const { tps } = state;
            let s = tps % 60;
            let h;

            s = s < 10 ? `0${s}` : s;
            h = (tps - s) / 60;

            state.tps = tps + 1;
            setChronometre(`${h} min ${s} s`);
        }, 1000);
        return state;
    };
    const stop = () => {
        clearInterval(state.timer);
        state.timer = undefined;
        return state;
    };

    const raz = () => {
        const { timer } = state;
        if (timer !== undefined) {
            stop();
        }
        state.tps = 0;
        setChronometre("0 min 00 s");
        return state;
    };
    const text = () => $id.textContent;
    return {
        start,
        stop,
        raz,
        text,
    };
};
