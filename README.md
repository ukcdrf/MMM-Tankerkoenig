# MMM-Tankerkoenig
This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/) which displays a fuel prices from [Tankerkoenig](https://www.tankerkoenig.de/).

[Fuel Price Data](https://creativecommons.tankerkoenig.de/) by [Tankerkönig](https://www.tankerkoenig.de/) are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
[Creative Commons Icons](http://cc-icons.github.io/) by [Ricardo Barros](https://twitter.com/richardba) are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changed colors to match MagicMirror'S dimmed class.

## Preview
![](https://github.com/terenc3/MMM-Tankerkoenig/blob/master/screenshot.png?raw=true)

## Installation
In your terminal, go to your MagicMirror's Module folder:
```bash
cd ~/MagicMirror/modules
```

Clone this repository:
```bash
git clone https://github.com/terenc3/MMM-Tankerkoenig.git
```

Configure the module in your `config.js` file.

## Obtain api key
Request a key at https://creativecommons.tankerkoenig.de/ with a valid e-mail and select MagicMirror as purpose.

## Using the module
To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Tankerkoenig',
            header: 'Super (E10)',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

## Configuration options
| Option           | Type       | Default 		| Description
|----------------- |----------- |-------------- | ---------------
| `updateInterval` | `number`	| `600`			| Update interval in seconds. Not less then 300 (5min) according to Terms
| `maxWidth`       | `string`   | `200px`       | Max width of the module
| `url`        	   | `string`	| `https://creativecommons.tankerkoenig.de/json/list.php` | Address to fetch prices from.
| `api_key`		   | `string`	| `null`		| API Key from https://creativecommons.tankerkoenig.de/
| `lat`        	   | `number`	| `52.0973` 	| Latitude of your location
| `lng`        	   | `number`	| `12.8717`		| Longiude of your location
| `type`           | `string`	| `e10`			| Fuel type must be on of e5, e10 or diesel
| `radius`         | `number`	| `25`			| Radius to search, max 25