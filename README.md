
# Text Analyzer

This project is a part of Udacity's nanodegree program for The fornt end developper track. It's a simple web page in which you type a text and a card that contains the language you typed, the classifications and the proposed hashtags. This project uses Aylien api to analyze the text and node to store the information locally. You need to create `.env` file that contains the APIID and APIKEY from Aylien api. This app uses webpack and WorkboxPlugin to make the app available offline.

## Structure

The structure of the project is as below:
```
|__src
   |__client
      |__js
         |__formHandler.js
         |__formHandler.spec.js
      |__styles
         |__resets.scss
      |__views
         |__index.html
      |__index.js
   |__server
      |__app.js
      |__app.spec.js
      |__server.js
|__.babelrc
|__ package.json
|__.README.md
|__ webpack.dev.js
|__ webpack.prod.js
```

## Install

```
$ git clone https://github.com/Azazanafaa/text-analyzer.git
$ cd text-analyzer/
$ npm install
$ npm run start
$ npm build-dev
```
## Contributing

Feel free to modify and add your own sections. I will be ***more than happy***.

## License

The content of this repository is licensed under a [The MIT License](https://opensource.org/licenses/MIT) .
