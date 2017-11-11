#!/bin/bash

DATE=$(date --rfc-3339=seconds | sed 's/ /T/')
FILENAME=/home/alexander/Documents/CryptoCatch/raw/rawData_$DATE.json
wget https://api.coinmarketcap.com/v1/ticker/?limit=10000 -O $FILENAME
