#!/bin/bash
if  [ ! -n "$1" ] ;then
    echo " \$1 casper / node"
    exit
fi

if  [ ! -n "$2" ] ;then
    echo "cronrule params is required"
    exit
fi

#node /alidata/www/crawl/cronsun/request.js $1 $2
docker exec -i crawl-v1 /alidata/server/node/bin/node /alidata/www/crawl/cronsun/request.js $1 $2


