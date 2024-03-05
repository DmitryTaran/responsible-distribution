export default {
	"widget": {
		"name": "widget.name",
		"description": "widget.description",
		"short_description": "widget.short_description",
		"version": "5.0.0",
		"interface_version": 2,
		"init_once": true,
		"locale": ["ru"],
		"installation": true,
		"support": {
			"link": "https://reon.pro/reminders",
			"email": "reon.helpdesk@gmail.com"
		}
	},
	"locations": ["everywhere", "settings", "widget_page", "digital_pipeline"],

	"left_menu": {
		"realty_widget_code": {
			"title": "left_menu.icon_title",
			"icon": "images/logo_min.png"
		}
	},
	"tour": {
		"is_tour": true,
		"tour_images": {
			"ru": [
				"/images/logo_main.png",
				"/images/logo_main.png",
				"/images/logo_main.png"
			]
		},
		"tour_description": "widget.tour_description"
	},
	"settings": {
		"client_name": {
			"name": "settings.client_name",
			"type": "text",
			"required": true
		},
		"phone_number": {
			"name": "settings.phone_number",
			"type": "text",
			"required": true
		},
		"terms_of_use": {
			"name": "settings.terms_of_use",
			"type": "text",
			"required": true
		}
	},
	"dp": {
		"settings": {
			"triggerInfo": {
				"name": "dp.template_id",
				"type": "text",
				"required": true
			},
			"widget_instance_id": {
				"name": "dp.widget_instance_id",
				"type": "text",
				"required": false
			}
		},
		"action_multiple": false,
		"webhook_url": "https://widev4.reon.pro/dimon/api/v1/responsible/triggers/web-hooks"
	}
}
