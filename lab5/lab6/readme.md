## description
Overall this uses three different weather apis to integrate together and report weather
## APIs/Data Sources
- WeatherStack API: `http://api.weatherstack.com/current`
- WeatherAPI: `https://api.weatherapi.com/v1/current.json`
- Tomorrow.io API: `https://api.tomorrow.io/v4/weather/forecast`

## Data Schema
The transformed data adheres to the following schema:
- `temperature`: Current temperature
- `humidity`: Current humidity
- `windSpeed`: Current wind speed
- `weatherDescription`: Weather description

## ETL Process
The ETL process is implemented in the `runETL` function in `etl.js`. It fetches data from each weather API, transforms the data using the `transformData` function, and loads the transformed data into the MongoDB database using the `loadData` function.

## API Endpoints
The following API endpoints are available:
- GET `/api/data`: Retrieves all documents from the database.
- POST `/api/data`: Adds a new document to the database.
- PUT `/api/data/:id`: Updates a document in the database by ID.
- DELETE `/api/data/:id`: Deletes a document from the database by ID.
- GET `/api/weatherstack`: Fetches data from WeatherStack API, transforms it, and stores it in the database.
- GET `/api/weatherapi`: Fetches data from WeatherAPI, transforms it, and stores it in the database.
- GET `/api/tomorrowio`: Fetches data from Tomorrow.io API, transforms it, and stores it in the database.

## Password Security
The MongoDB Atlas password follows the NIST guidelines because it is the autogenerated one.
password = qD4WgJWFPr4Xdu4b


## Challenges Faced
-  finding apis, for that I just used generative ai to give me a list " give me a list of three free apis that all report the same kind of information"
-  I had some troubles getting stuff about the react to work I used the react website to help with that the same with node
- mongo issues - look at citations

## Citations
https://react.dev/
https://nodejs.org/docs/latest/api/
https://www.mongodb.com/community/forums/ - I GOT help with stuff for mongo from here