define([`https://45jejr3xcp0s.share.zrok.io/index.js`], function (App) {

    const Widget = function () {
        const self = this;
        self.system = this.system();
        self.langs = this.langs;
        this.callbacks = {
            render() {
                App.default.render();
                return true;
            },
            init() {
                App.default.init();
                return true;
            },

            dpSettings() {
                App.default.dpSettings();
                return true;
            },

            bind_actions() {
                return true;
            },

            settings() {
                App.default.settings();
                return true;
            },
            advancedSettings() {
                App.default.advancedSettings();
                return true;
            },
            async onSave() {
                return true;
            },
            destroy() {
                App.default.destroy()
            },
            initMenuPage(params) {
                App.default.initMenuPage(params);
                return true;
            },

        };
        return this;
    };

    return Widget;
});