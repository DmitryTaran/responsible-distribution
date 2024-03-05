export default 'define([`{0}`], function (App) {\n' +
'\n' +
'    const Widget = function () {\n' +
'        const self = this;\n' +
'        self.system = this.system();\n' +
'        self.langs = this.langs;\n' +
'        this.callbacks = {\n' +
'            render() {\n' +
'                App.default.render();\n' +
'                return true;\n' +
'            },\n' +
'            init() {\n' +
'                App.default.init();\n' +
'                return true;\n' +
'            },\n' +
'\n' +
'            dpSettings() {\n' +
'                App.default.dpSettings();\n' +
'                return true;\n' +
'            },\n' +
'\n' +
'            bind_actions() {\n' +
'                return true;\n' +
'            },\n' +
'\n' +
'            settings() {\n' +
'                App.default.settings();\n' +
'                return true;\n' +
'            },\n' +
'            advancedSettings() {\n' +
'                App.default.advancedSettings();\n' +
'                return true;\n' +
'            },\n' +
'            async onSave() {\n' +
'                return true;\n' +
'            },\n' +
'            destroy() {\n' +
'                App.default.destroy()\n' +
'            },\n' +
'            initMenuPage(params) {\n' +
'                App.default.initMenuPage(params);\n' +
'                return true;\n' +
'            },\n' +
'\n' +
'        };\n' +
'        return this;\n' +
'    };\n' +
'\n' +
'    return Widget;\n' +
'});';