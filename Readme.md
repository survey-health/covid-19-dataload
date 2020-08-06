# Install Directions

* install Node.js version 1.12
* run `npm install`
* run `npm run build`
* copy .env.dist to .env and update the settings for your FileMaker environment

# Using the tool

Export your Student or Faculty list without headers in the format

`ID,FirstName,LastName,DOB,Active (1/0)`

* node build/index.js Student /path/to/studentsfile.csv
* node build/index.js Faculty c:\path\to\faculty.csv

If the file is uploaded correctly the tool will return a status code of 0.  if you didn't pass the correct paramaters it will return the status code of 100.  If there was a error talking to FileMaker it will return a status code of 200.