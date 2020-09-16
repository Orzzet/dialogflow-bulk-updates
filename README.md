# Faster Dialogflow Updates
GUI to make changes to a dialogflow project locally and bulk update them. Useful to transfer a lot of training phrases between intents.

While using the dialogflow console I found it very tedious to move a lot of training phrases betweet intents, you have to move the training phrases one by one and, on top of that, every time you do it the training starts.

With this tool you can download all the intents with their training phrases and easily move them locally, then you can bulk update the modified intents.

Here you can see an example. [(link to high quality gif)](https://raw.githubusercontent.com/Orzzet/Media/master/faster-dialogflow.gif)

![Example](https://raw.githubusercontent.com/Orzzet/Media/master/faster-dialogflow-800.gif)

## Installation

First you need to download credentials for your project, you can do this in the Google Cloud Platform Console. Credentials should be stored safely in a file with the name dialogflow-secret.json. The contents of the file should look something like this:

```
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": ""
}
```
With remining fields filled.

### Docker

You need to install docker and then.

```
docker run -d -v /path/to/dialogflow-secret.json:/root/api/secret/dialogflow-secret.json -h localhost -p 80:80 -p 3030:3030 orzzet/faster-dialogflow
```
* You need to change /path/to/dialogflow-secret.json to the path you stored credentials.
* -d is optional, with this you run the container in the background so you can keep using the console.
* You can change the httpd port to a different one, for example to change it to 8080 write `-p 8080:80` instead of `-p 80:80`
* You can not change the 3030 port to a different one, it's used by de app.

After that open your browser and go to localhost:80 (or the desired port).

> I have also included the files needed to build the docker image. Keep in mind that the current process copy the api and gui folders with node_modules already installed, so before you build the image, you need to install all dependecies with `lerna install` from the root or `npm install` from inside each project.

### Source

I used [lerna](https://github.com/lerna/lerna) to help with future development and to make the project easier to start running but the current use is minimal, you actually don't need it and can treat api and gui as two completely different projects. Still, I am going to explain how to use the app using lerna.

```
git clone https://github.com/Orzzet/faster-dialogflow-updates
cd faster-dialogflow-updates
lerna install
lerna start
```

Then you need to move the credentials (the .json file) to faster-dialogflow-updates/packages/api/secret/dialogflow-secret.json

After that open your browser and go to localhost:80

* If you want to run api and gui separately, you need to run 'npm install' from inside each project, then `npm start` from api and `npm run serve` from gui.
* `npm run serve` should be only for development, for production use `npm run build`, all the needed files will be in the folder gui/dist.
* If you want to run api on a different machine or port, you need to change [this line](https://github.com/Orzzet/faster-dialogflow-updates/blob/cc98edb2b922a5cb16843c7aa53f921c14d42bd2/packages/gui/src/main.js#L13)
