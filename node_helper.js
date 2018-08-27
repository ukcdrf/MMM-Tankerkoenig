/* Magic Mirror
 * Module: MMM-Tankerkoenig
 *
 * By Benjamin Kahlau
 * MIT Licensed.
 */
const node_helper = require('node_helper');
const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports = node_helper.create({
	instances: [],

	getStations: function (identifier, url, query, interval) {
		var self = this;

		request({
			url: url,
			method: 'GET',
			qs: query
		}, function (error, response, body) {
			if (error) {
				return self.sendMessage('ERROR', identifier, {
					error: error.message
				});
			}

			var stations = JSON.parse(body).stations.filter(function (station) {
				return typeof station.price === 'number';
			});



			self.instances[identifier] = stations;

			self.sendMessage('DATA', identifier, {
				stations: stations
			});

			setTimeout(function() {
				self.getStations(identifier, url, query, interval);
			}, interval * 1000);
		});
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === this.name + '_GET') {
			if (this.instances[payload.identifier] && typeof this.instances[payload.identifier] === 'string') {
				return this.sendMessage('DATA', payload.identifier, {
					stations: this.instances[payload.identifier]
				});
			}
			this.instances[payload.identifier] = true;

			this.getStations(payload.identifier, payload.url, {
				lat: payload.lat,
				lng: payload.lng,
				rad: payload.radius,
				apikey: payload.apikey,
				type: payload.type,
				sort: 'price'
			}, payload.interval, this.done);
		}
	},

	sendMessage: function (message, identifier, payload) {
		this.sendSocketNotification(this.name + '_' + message, Object.assign({}, {
			identifier: identifier
		}, payload));
	}
});
