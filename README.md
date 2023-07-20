![spuren_logo.svg](src%2Fassets%2Fimg%2Fspuren_logo.svg)

# DER STEINBRUCH, DAS LAGER UND DIE ORTSCHAFTEN

## Description
Entstanden an der FH St. Pölten im Zuge eines Forschungsprojekts.

## Links
* [Granitsteinbruch WebApp](https://granitsteinbruch.at/)
* [FH St. Pölten](https://research.fhstp.ac.at/projekte/spuren-lesbar-machen-im-ns-zwangsarbeitslager-roggendorf-pulkau)
* [spurenlesbarmachen.at](https://www.spurenlesbarmachen.at/)


## Tech Stack

| Technologie                                        | Version | Description                        |
|----------------------------------------------------|---------|------------------------------------|
| [Ionic](https://ionicframework.com/docs/components) | 7       | Mobile Framework                   |
| [Vue](https://vuejs.org/guide/introduction.html)   | 3       | Frontend Web Development Framework |
| [Yarn](https://yarnpkg.com/)                       | 1.22    | Package manager                    |
| [Capacitor](https://capacitorjs.com/)              | 4.1.1   | Cross Device support               |


## Run

Move in the root directory and execute 
```
# Move into your directory
cd /spuren-pulkau/

# Install dependencies
yarn

# or with NPM
npm install

# Start application in browser
ionic serve
```

## Publish to Android
We will use [Android Studio](https://developer.android.com/studio) as build tool. That installs all necessary SDKs to your machine. 

1. ```ionic config set -g npmClient yarn``` (optional | Switching ionic package manager to yarn)
2. ```ionic capacitor add android``` (creates /android and builds /www directories)
3. ```ionic capacitor copy android``` (copies /www/ source into /android)
4. ```ionic capacitor open android``` (open in android studio)
5. ```ionic capacitor run android``` (you have to [add a virtual or real device](https://developer.android.com/studio/run/managing-avds) first in android studio)

## License
[MIT licensed](LICENSE)
