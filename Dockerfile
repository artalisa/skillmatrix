FROM node:latest

RUN mkdir /project
COPY ./ /project

WORKDIR /project

RUN npm run build

#CMD ["grunt", "serve"]
