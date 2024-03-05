export default '{\n' +
'\t"widget": {\n' +
'\t\t"name": "widget.name",\n' +
'\t\t"description": "widget.description",\n' +
'\t\t"short_description": "widget.short_description",\n' +
'\t\t"version": "5.0.0",\n' +
'\t\t"interface_version": 2,\n' +
'\t\t"init_once": true,\n' +
'\t\t"locale": ["ru"],\n' +
'\t\t"installation": true,\n' +
'\t\t"support": {\n' +
'\t\t\t"link": "https://reon.pro/reminders",\n' +
'\t\t\t"email": "reon.helpdesk@gmail.com"\n' +
'\t\t}\n' +
'\t},\n' +
'\t"locations": ["everywhere", "settings", "widget_page", "digital_pipeline"],\n' +
'\n' +
'\t"left_menu": {\n' +
'\t\t"realty_widget_code": {\n' +
'\t\t\t"title": "left_menu.icon_title",\n' +
'\t\t\t"icon": "images/logo_min.png"\n' +
'\t\t}\n' +
'\t},\n' +
'\t"tour": {\n' +
'\t\t"is_tour": true,\n' +
'\t\t"tour_images": {\n' +
'\t\t\t"ru": [\n' +
'\t\t\t\t"/images/logo_main.png",\n' +
'\t\t\t\t"/images/logo_main.png",\n' +
'\t\t\t\t"/images/logo_main.png"\n' +
'\t\t\t]\n' +
'\t\t},\n' +
'\t\t"tour_description": "widget.tour_description"\n' +
'\t},\n' +
'\t"settings": {\n' +
'\t\t"client_name": {\n' +
'\t\t\t"name": "settings.client_name",\n' +
'\t\t\t"type": "text",\n' +
'\t\t\t"required": true\n' +
'\t\t},\n' +
'\t\t"phone_number": {\n' +
'\t\t\t"name": "settings.phone_number",\n' +
'\t\t\t"type": "text",\n' +
'\t\t\t"required": true\n' +
'\t\t},\n' +
'\t\t"terms_of_use": {\n' +
'\t\t\t"name": "settings.terms_of_use",\n' +
'\t\t\t"type": "text",\n' +
'\t\t\t"required": true\n' +
'\t\t}\n' +
'\t},\n' +
'\t"dp": {\n' +
'\t\t"settings": {\n' +
'\t\t\t"triggerInfo": {\n' +
'\t\t\t\t"name": "dp.template_id",\n' +
'\t\t\t\t"type": "text",\n' +
'\t\t\t\t"required": true\n' +
'\t\t\t},\n' +
'\t\t\t"widget_instance_id": {\n' +
'\t\t\t\t"name": "dp.widget_instance_id",\n' +
'\t\t\t\t"type": "text",\n' +
'\t\t\t\t"required": false\n' +
'\t\t\t}\n' +
'\t\t},\n' +
'\t\t"action_multiple": false,\n' +
'\t\t"webhook_url": "{0}"\n' +
'\t}\n' +
'}\n'