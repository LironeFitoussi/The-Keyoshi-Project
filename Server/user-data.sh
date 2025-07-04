#!/bin/bash
set -euxo pipefail

# 1. Update system and install Docker + Apache
dnf update -y
dnf install -y docker httpd

# 2. Start and enable Docker + Apache
systemctl enable docker
systemctl start docker
systemctl enable httpd
systemctl start httpd

# 3. Allow ec2-user to use Docker without sudo (after reboot/login)
usermod -aG docker ec2-user

# 4. Docker Hub login (DO NOT use email address)
echo "Qu#VS,M33esGxd5" | docker login -u "lironefitoussi" --password-stdin

# 5. Pull Docker image
docker pull lironefitoussi/kyoshi-node-app:latest

# 6. Run your Node.js container with env vars and restart policy
docker run -d \
  --restart=always \
  --name=nodeapp \
  -p 3000:3000 \
  -e PORT=3000 \
  -e MONGO_URI="mongodb+srv://lironefit:nfrCkw6H4NBgtVLz@cluster0.cqjeagn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" \
  -e MONGO_USERNAME=lironefit \
  -e MONGO_PASSWORD=nfrCkw6H4NBgtVLz \
  lironefitoussi/kyoshi-node-app:latest

# 7. Configure Apache reverse proxy to container
cat <<EOF > /etc/httpd/conf.d/nodeapp.conf
<VirtualHost *:80>
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    ErrorLog /var/log/httpd/nodeapp-error.log
    CustomLog /var/log/httpd/nodeapp-access.log combined
</VirtualHost>
EOF

# 8. Enable Apache proxy modules (safe append)
grep -q proxy_module /etc/httpd/conf/httpd.conf || echo "LoadModule proxy_module modules/mod_proxy.so" >> /etc/httpd/conf/httpd.conf
grep -q proxy_http_module /etc/httpd/conf/httpd.conf || echo "LoadModule proxy_http_module modules/mod_proxy_http.so" >> /etc/httpd/conf/httpd.conf

# 9. Restart Apache to apply reverse proxy config
systemctl restart httpd
