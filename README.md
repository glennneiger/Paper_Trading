# Paper Trading Application
A Stock Trade Simulator 

This application is created with React on the front-end and Spring Boot on the Back-end. The application serves as a stock trade simulator allowing users to simulate the buying and selling experience in the stock market. All stock data as collected from IEX Cloud API.

## Deployment
http://ai-zixun.com/paper-trading

## Web Technology Used in this project 

#### Front-End: React.js + Material UI + CSS in JS (JSS) 
<p align="center">
  <img src="readme_img/icon-react.png" height="100" title="react">
  <img src="readme_img/icon-material-ui.png" height="100" title="material-ui">
  <img src="readme_img/icon-jss.png" height="100" title="jss">
</p>

#### Back-End: Spring Boot + MySQL
<p align="center">
  <img src="readme_img/icon-spring-boot.png" height="100" title="spring-boot">
  <img src="readme_img/icon-mysql.svg" height="100" title="mysql">
</p>

#### Deployment: AWS Elastic Beanstalk + Docker 
<p align="center">
  <img src="readme_img/icon-eb.png" height="100" title="eb">
  <img src="readme_img/icon-docker.png" height="100" title="docker">
</p>

```
mv -v ./react/build/* ./target/classes/static/
```

```
./mvnw package
```
