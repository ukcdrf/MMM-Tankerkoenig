/* global Module */

/* Magic Mirror
 * Module: MMM-Tankerkoenig
 *
 * By Benjamin Kahlau
 * MIT Licensed.
 */
Module.register('MMM-Tankerkoenig', {
	defaults: {
		updateInterval: 600,
		maxWidth: '800px',
		url: 'https://creativecommons.tankerkoenig.de/json/list.php',
		api_key: null,
		lat: 52.0973,
		lng: 12.8717,
		type: 'e10',
		radius: 25
	},

	requiresVersion: '2.2.0',

	getStyles: function () {
		return [this.name + '.css'];
	},

	getTranslations: function() {
		return {
			en: 'i18n/en.json',
			de: 'i18n/de.json'
		};
	},

	start: function() {
		this.stations = [];

		this.sendSocketNotification(this.name + '_GET', {
			identifier: this.identifier,
			url: this.config.url,
			lat: this.config.lat,
			lng: this.config.lng,
			type: this.config.type,
			radius: this.config.radius,
			apikey: this.config.api_key,
			interval: this.config.updateInterval
		});
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === this.name + '_ERROR' && payload.identifier === this.identifier) {
			console.log(payload.error);
			this.sendNotification('SHOW_ALERT', {
				title: this.name,
				message: this.translate('error'),
				timer: 3000
			});
		}

		if (notification === this.name + '_DATA' && payload.identifier === this.identifier) {
			this.stations = payload.stations;

			this.updateDom();
		}
	},

	getTemplate: function () {
		return this.name + '.njk';
	},

	getTemplateData: function () {
		return {
			config: this.config,
			stations: this.stations,
			loading: this.translate('loading'),
			module_path: 'modules/' + this.name
		};
	}
});
