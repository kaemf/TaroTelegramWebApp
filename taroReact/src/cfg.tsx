interface FaceCfg {
    durationPrint: number;
}

const cfg: FaceCfg = {
    durationPrint: 90,
};

function sleep(s: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), s);
    });
}

export { cfg, sleep };
