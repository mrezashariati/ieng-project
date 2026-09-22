# ieng-project

A small Node.js/Express GIS web service, built in 2020 for the Internet Engineering course at Shahid Beheshti University ([project spec](https://github.com/sehsanm/sbu-ieng-99/)). It stores named GeoJSON polygons and answers which of them contain a given point. It also has a page listing COVID-19 statistics per country.

**Aim:** practise building a REST backend with Express: routing, GeoJSON validation, error handling, logging with winston, and server-side views with EJS.

## Endpoints

- `GET /gis/polygons`: all stored polygons.
- `GET /gis/testpoint?lat=<lat>&long=<long>`: the names of the polygons that contain the point.
- `PUT /gis/addpolygon`: adds a GeoJSON polygon `Feature` with `properties.name`. Added polygons are kept in memory only.
- `GET /countries/statistics`: a COVID-19 table per country. The upstream API has since gone offline, so this route now fails.

## Run

```bash
npm install
mkdir -p logs
printf 'PORT=3000\nHOST=localhost\n' > .env
npm start
curl "http://localhost:3000/gis/testpoint?lat=35.7&long=51.4"
```
