#!/bin/sh

Copy the config from cloud
echo "Copy the config from cloud..."
aws s3 cp s3://wallet-highlevel ./config --recursive
echo "copied"

echo "Copy the nginx to machine"
cp config/nginx.conf /etc/nginx/nginx.conf
echo "copied"

echo "restart nginx"
systemctl restart nginx
echo "restarted"

# echo "Make bootstrap"
# make bootstrap
# echo "bootstrap completed"

# echo "start frontend build"
# cd frontend/
# yarn build
# cd ../
# echo "build completed"


# Run Bootstrap
echo "start backend"

npx pm2 stop all
npx pm2 start script/wallet --update-env


echo "backend completed."