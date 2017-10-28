#!/bin/bash

# Clean old txtdb
if [ -e app/assets/txtdb.json ]; then
	rm app/assets/txtdb.json
fi

echo "[" >> app/assets/txtdb.json

# Create new txtdb
for i in raw/*; do
	echo "Appending $(echo $i | cut -d \/ -f 2) to app/assets/txtdb.json"
	echo "{" >> app/assets/txtdb.json
	printf "\"date\": \"$(echo $i | cut -d \_ -f 2 | cut -d \+ -f 1)\",\n" >> app/assets/txtdb.json
	printf "\"rankList\": $(cat $i)\n" >> app/assets/txtdb.json
	echo "}," >> app/assets/txtdb.json
done

sed -i '$ d' app/assets/txtdb.json
printf "}\n]\n" >> app/assets/txtdb.json