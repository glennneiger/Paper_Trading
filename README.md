# Paper Trading Application
A Stock Trade Simulator 

This application is created with React on the front-end and Spring Boot on the Back-end. The application serves as a stock trade simulator allowing users to simulate the buying and selling experience in the stock market. All stock data as collected from IEX Cloud API.

## Deployment
http://ai-zixun.com/paper-trading

## Web Technology Used in this project 

#### Front-End: React.js (With TypeScript) + Material UI + CSS in JS (JSS) 
<p align="center">
  <img src="readme_img/icon-react.png" height="100" title="react">
  <img src="readme_img/icon-ts.png" height="100" title="ts">
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
./mvnw package
```




## Instruction to Run Locally (via Docker)

1. Make sure that your local environment has docker installed. Please refer to the Docker documation on installation: https://docs.docker.com/install/ 
2. Build React Application 
```
cd react/
npm run build 
cd .. 
```

3. Move Built React Application to Spring Boot Java Static directory 
```
mv -v ./react/build/* ./target/classes/static/
```

4. Build Spring Boot Application 
```
./mvnw package
```

5. Move JAR file to deploy directory  
```
mv -v ./target/papertrading-0.0.1-SNAPSHOT.jar ./deploy/ 
```

6. Deployment 
  1. If using AWS, directly upload the deploy folder to deploy via Docker 
  2. If running locally. 
```
cd deploy/
docker image build -t paper-trade .
docker run paper-trade
```
