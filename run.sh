#!/bin/bash

npm run build

screen -X -S website quit
screen -dmS website npm run start