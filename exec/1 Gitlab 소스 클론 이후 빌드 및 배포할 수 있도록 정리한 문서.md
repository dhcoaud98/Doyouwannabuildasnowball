# Server Setting
[public ip]

k7a601.p.ssafy.io: 15.165.15.32

# 배포 환경 설정

---

## 서버

- AWS EC2(ubuntu 20.04 LTS)

---

## Docker 설정 (ver. 20.10.21)

### 1. 오래된 버전 삭제

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

### 2. apt update 및 repository 설정

```bash
sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### 3. Docker의 Official GPG Key 등록

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### 4. stable repository  등록

```bash
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 5. Docker Engine 설치

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### 6. 설치 후 버전 확인

```bash
docker --version
```

### 7. sudo 없이 docker 명령어 실행

```bash
# 사용자 권한 변경
sudo usermod -aG docker $USER

# 로그아웃 후 재접속
exit
```

## MySQL 설정 (ver. 8.0.31)

### 1. MySQL Image install

```bash
docker pull mysql
```

### 2. Docker image 확인

```bash
docker images
```

### 3. Docker 컨테이너 생성 및 실행

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=<password> -d -p 3306:3306 <mysql image name>
```

### 4. MySQL 접속

```bash
docker exec -it mysql bash
```

### 4-1. 접속 및 버전 확인

```bash
# 버전 확인
show variables like "%version%";

# 접속
mysql -u root -p
```

### 4-2. root 계정 비밀번호 변경

```bash
alter user 'root'@'localhost' identified with mysql_native_password by 'mylittlesnowball601!';
flush privileges;
```

### 4-3. user 계정 생성 및 권한 설정

```bash
create user 'ssafy'@'%' identified by 'mylittlesnowball601!';
grant all privileges on *.* to 'ssafy'@'%' with grant option;
flush privileges;
```

## MongoDB 설정 ( ver. 6.0.2)

### 1. Docker MongoDB Image install

```bash
docker pull mongo
```

### 2. Docker image 확인

```bash
docker image
```

### 3. Docker 컨테이너 생성 및 실행 (MongoDB 보안 설정 —auth)

```bash
docker run --name mongodb -v ~/data:/data/db -d -p 27017:27017 mongo --auth
```

### 4. MongoDB 접속

```bash
docker exec -it mongodb bash
```

### 4-1. 몽고디비 관리자 계정 추가

- mongosh로 mongo-cli 실행
    
    ```bash
    mongosh
    ```
    
- 데이터베이스 관리자로 전환
    
    ```bash
    use admin
    ```
    
- 계정 생성
    
    ```bash
    db.createUser(
    ... {
    ... user: "admin",
    ... pwd: "Tkvl601!",
    ... roles: ["root"]
    ... }
    ... )
    ```
    

### 4-2. 사용자 계정 생성

사용자 계정을 만들때는 특정 DB로 가서 만들어야함.

```bash
#snowball collection으로 이동
use snowball

db.createUser({
... user:'ssafy',
... pwd:'skwkrrnl601!',
... roles:["readWrite"]
... })
```

### 4-3. 사용자 확인

```bash
# 계정 auth 인증
db.auth('user', 'pwd')

# 사용자 확인 
show users
```

### 5. Auth 설정

/etc/mongod.conf 열어서 수정

```bash
# 이부분 변경해야 Auth 적용
security:
		authorization: enabled
```

<aside>
💡 설정 파일 변경하면 항상 재시작
sudo systemctl restart mongod

</aside>

### 6. MongoDB Compass 연결

```
# 연결 url
mongodb://[username:password@]host1[:port1],...hostN[:portN]][/[defaultauthdb][?options]]
([]는 생략이 가능하다는 의미입니다.)

ex)
mongodb://hihi:1234@123.123.123.123:27017/dbname

계정 ID: hihi
pwd: 1234
MongoDB가 설치된 곳의 IP: 123.123.123.123
포트: 27017
사용 DB 이름: dbname
```

## Nginx 설정 (SSL 및 HTTP2 적용)

### 1. Nginx 설치 (1.18.0)

```bash
sudo apt-get update
sudo apt install nginx
```

### 2. Certbot 설치 후 인증서 발급

- letsencrypt의 형태로 SSL/TLS 인증서를 무료로 제공하는 라이브러리

```bash
sudo apt-add-repository -r ppa:certbot/certbot

# 해당 저장소에 담긴 패키지 정보를 확인할 수 있도록 업데이트
sudo apt-get update

# certbot 설치
sudo apt-get install python3-certbot-nginx

# Server Public IP 확인
curl ip.ojj.kr

# gabia DNS 설정,  Public IP 추가
# - 호스트 : www , 값/위치 : 15.165.15.32
# - 호스트 : @ , 값/위치 : 15.165.15.32

# 설치된 certbot을 이용하여 도메인(mylittlesnowball.com)에 대한 SSL 인증서 발급 
sudo certbot certonly --nginx -d mylittlesnowball.com

# 아래 경로에 5개의 파일(4개의 .pem, 1개의 readme) 생성 확인
sudo ls -al /etc/letsencrypt/live/mylittlesnowball.com

# 90일마다 만료되는 인증서 자동 갱신 설정
sudo certbot renew --dry-run
```

### 3. Nginx 설정 파일 수정 (HTTP2 적용)

- **/etc/nginx/nginx.conf**
    
    ```bash
    user www-data;
    worker_processes auto;
    pid /run/nginx.pid;
    include /etc/nginx/modules-enabled/*.conf;
    
    events {
            worker_connections 768;
            # multi_accept on;
    }
    
    http {
    				# 요청 데이터 사이즈 설정
            client_max_body_size 10M;
    
            ##
            # Basic Settings
            ##
    
            sendfile on;
            tcp_nopush on;
            tcp_nodelay on;
            keepalive_timeout 65;
            types_hash_max_size 2048;
            # server_tokens off;
    
            # server_names_hash_bucket_size 64;
            # server_name_in_redirect off;
    
            include /etc/nginx/mime.types;
            default_type application/octet-stream;
    
            ##
            # SSL Settings
            ##
    
            ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
            ssl_prefer_server_ciphers on;
    
            ##
            # Logging Settings
            ##
    
            access_log /var/log/nginx/access.log;
            error_log /var/log/nginx/error.log;
    
            ##
            # Gzip Settings
            ##
    
            gzip on;
    
            #gzip_vary on;
            gzip_proxied any;
            gzip_comp_level 6;
            gzip_buffers 16 8k;
            gzip_types
                    application/javascript
                    text/css
                    application/octet-stream;
            # gzip_http_version 2;
            # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
            ##
            # Virtual Host Configs
            ##
    
            include /etc/nginx/conf.d/*.conf;
            include /etc/nginx/sites-enabled/*;
    }
    
    #mail {
    #       # See sample authentication script at:
    #       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
    #
    #       # auth_http localhost/auth.php;
    #       # pop3_capabilities "TOP" "USER";
    #       # imap_capabilities "IMAP4rev1" "UIDPLUS";
    #
    #       server {
    #               listen     localhost:110;
    #               protocol   pop3;
    #               proxy      on;
    #       }
    #
    #       server {
    #               listen     localhost:143;
    #               protocol   imap;
    #               proxy      on;
    #       }
    #}
    ```
    
- **/etc/nginx/sites-available/default**
    
    ```bash
    ##
    # You should look at the following URL's in order to grasp a solid understanding
    # of Nginx configuration files in order to fully unleash the power of Nginx.
    # https://www.nginx.com/resources/wiki/start/
    # https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
    # https://wiki.debian.org/Nginx/DirectoryStructure
    #
    # In most cases, administrators will remove this file from sites-enabled/ and
    # leave it as reference inside of sites-available where it will continue to be
    # updated by the nginx packaging team.
    #
    # This file will automatically load configuration files provided by other
    # applications, such as Drupal or Wordpress. These applications will be made
    # available underneath a path with that package name, such as /drupal8.
    #
    # Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
    ##
    
    # Default server configuration
    #
    server {
            listen 80 default_server;
            listen [::]:80 default_server;
    
            # SSL configuration
            #
            listen 443 ssl default_server;
            listen [::]:443 ssl default_server;
    
            ssl_certificate /etc/letsencrypt/live/mylittlesnowball.com/fullchain.pem;
            ssl_certificate_key /etc/letsencrypt/live/mylittlesnowball.com/privkey.pem;
            #
            # Note: You should disable gzip for SSL traffic.
            # See: https://bugs.debian.org/773332
            #
            # Read up on ssl_ciphers to ensure a secure configuration.
            # See: https://bugs.debian.org/765782
            #
            # Self signed certs generated by the ssl-cert package
            # Don't use them in a production server!
            #
            # include snippets/snakeoil.conf;
    
            root /var/www/html;
    
            # Add index.php to the list if you are using PHP
            index index.html index.htm index.nginx-debian.html;
    
            server_name _;
    
            location / {
                    # First attempt to serve request as file, then
                    # as directory, then fall back to displaying a 404.
                    try_files $uri $uri/ =404;
            }
    
            # pass PHP scripts to FastCGI server
            #
            #location ~ \.php$ {
            #       include snippets/fastcgi-php.conf;
            #
            #       # With php-fpm (or other unix sockets):
            #       fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
            #       # With php-cgi (or other tcp sockets):
            #       fastcgi_pass 127.0.0.1:9000;
            #}
    
            # deny access to .htaccess files, if Apache's document root
            # concurs with nginx's one
            #
            #location ~ /\.ht {
            #       deny all;
            #}
    }
    
    # Virtual Host configuration for example.com
    #
    # You can move that to a different file under sites-available/ and symlink that
    # to sites-enabled/ to enable it.
    #
    #server {
    #       listen 80;
    #       listen [::]:80;
    #
    #       server_name example.com;
    #
    #       root /var/www/example.com;
    #       index index.html;
    #
    #       location / {
    #               try_files $uri $uri/ =404;
    #       }
    #}
    ```
    
- **/etc/nginx/sites-available/mylittlesnowball.conf**
    
    ```bash
    #upstream backend {
    #  server localhost:8080;
    #  server localhost:8081;
    #  server localhost:8082;
    
    #}
    
    server {
      listen 80; #80포트로 받을 때
      server_name mylittlesnowball.com www.mylittlesnowball.com; #도메인주소, 없을경우 localhost
      return 301 https://mylittlesnowball.com$request_uri;
    
    }
    
    server {
      listen 443 ssl http2 ipv6only=on;
      listen [::]:443 ssl http2;
      server_name mylittlesnowball.com www.mylittlesnowball.com;
    
      # ssl 인증서 적용하기
      ssl_certificate /etc/letsencrypt/live/mylittlesnowball.com/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/mylittlesnowball.com/privkey.pem;
    
            location / { # 프론트엔드
                    proxy_pass http://localhost:3000;
            }
    
      location /api { # 백엔드
        proxy_pass http://localhost:8080;
        #proxy_pass http://backend;
        #proxy_http_version 2;
        proxy_set_header Connection "";
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme; # https 필요
    
    #    # 웹 소켓 설정
    #    proxy_set_header Connection "upgrade";
    #    proxy_set_header Upgrade $http_upgrade;
      }
    }
    ```
    
- sites-enabled에 심볼릭 링크 설정
    
    ```bash
    sudo ln -s /etc/nginx/sites-available/mylittlesnowball.conf /etc/nginx/sites-enabled
    ```
    
- nginx 재시작
    
    ```bash
    sudo service nginx restart
    ```
    

# Jenkins 설정 (2.361.3)

> [https://hyunmin1906.tistory.com/272](https://hyunmin1906.tistory.com/272) (참고)
> 

### 1. Java11 설치

```bash
# apt 업데이트 
apt-get update

sudo apt-get install openjdk-11-jdk
```

### 2. Jenkins 설치

```bash
# Jenkins 저장소 key 다운로드
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -

# sources.list에 추
echo deb http://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list

# key 등록
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key FCEF32E745F2C3D5

# apt 업데이트
sudo apt-get update

# jenkins 설치
sudo apt-get install jenkins

# jenkins 서버 포트 번호 변경
	# jenkins version 2.335 이전
	sudo vi /etc/default/jenkins
	HTTP_PORT = 9090
	
	# jenkins version 2.335 이후
	sudo vi /lib/systemctl/system/jenkins.service
	Environment = "JENKINS_PORT = 9090"

# jenkins 서비스 재시작
sudo service jenkins restart

# jenkins 상태 확인 > 포트 확인
service jenkins status
```

### 3. jenkins 접속

```bash
# jenkins 접속
<public ip>:9090
 # http://15.165.15.32:9090

# admin password 확인
# 밑에 2개 중 하나로 확인
cat /var/lib/jenkins/secrets/initialAdminPassword
cat /var/jenkins_home/secrets/initialAdminPassword
	# 502dc8c910524d7199738c758de665e0
```

### 5. 기본 플러그인 설치

## Pipeline 생성 및 설정, Gitlab 연결

> [https://rainbound.tistory.com/entry/JENKINS-GITLAB-연결](https://rainbound.tistory.com/entry/JENKINS-GITLAB-%EC%97%B0%EA%B2%B0) (참고)
> 

### 1. Gitlab에서 API Token 생성하기

```yaml
# Gitlab에서 해당 프로젝트 선택 → 설정 → 액세스 토큰
Token name: 토큰 이름
Expiration date: 토큰 사용기한. 안 적으면 무제한
Select a role: Maintainer
Select scopes: 권한부여. 전부 체크

Create project access token 버튼 누르면 토큰 생성 완료.
# 토큰 복사해서 따로 적어놔야 함.
	# y_3sdQayosX6VbsCFTHx
```

### 2. Jenkins에서 Gitlab 연결

```yaml
# Dashboard → Jenkins 관리 → Configure System (시스템 설정)
# 'Gitlab' 탭에서 설정
'Enable authentication for '/project' end-point' 체크

Connection name: 임의로 설정 (gitlab_snowball)
Gitlab host URL: https://lab.ssafy.com
Credentials: GitLab API token
	# 위의 Gitlab API token으로 설정
```

### 3. Pipeline 생성 및 설정

```yaml
# Dashboard → 새로운 Item → pipeline
# General
GitLab Connection: 2에서 만든 gitlab connection 이름으로 설정

# Build Triggers
Build when a change is pushed to GitLab 체크 후 URL 복사
	# http://15.165.15.32:9090/project/new
Push Events 체크
Rebuild open Merge Requests: Never
Approved Merge Requests (EE-only) 체크
Comments 체크

고급 버튼 누른 후 secret token 생성 후 복사
	# dce24e4dc7bbb7d944c95d958735e332
```

### 4. Gitlab으로 이동 후 Webhooks 설정

```yaml
# Gitlab에서 해당 프로젝트 선택 → 설정 → Webhooks
URL: 위에서 복사했던 URL
Secret token: 위에서 발급받은 secret token
Trigger: Push events 체크 (dev)
SSL Verification: Enable SSL Verification 체크

Add webhook 버튼 누르기

# 생성된 Webhook이 아래에 있음
Test → Push events
# HTTP:200 뜨면 Webhook 설정 완료
```

### 5. Jenkins로 이동 후 pipeline 설정

```yaml
# pipeline 내 구성 → pipeline 탭
Definition: Pipeline script from SCM
	# 설정 방법 pipeline script와 SCM 두가지 방법이 있음. 여기선 SCM 사용
	# - pipeline script: jenkins내에서 스크립트를 입력하는 방법. 젠킨스 내에서 관리
	# - SCM: 외부에서 스크립트로 관리할 수 있음.
SCM: Git
Repositories:
	Repository URL: https://lab.ssafy.com/s07-final/S07P31A601
	Credentials: Add > Username with password (gitlab 계정)
Branches to build: */dev
Script Path: Jenkinsfile

```

## Dokcerfile 및 Jenkinsfile

### 1. 백엔드 Dockerfile

```bash
FROM openjdk:8 AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod =x ./gradlew
RUN ./gradlew bootJar
#RUN ./gradlew clean build --exclude-task test

FROM openjdk:8
COPY --from=builder build/libs/doyouwannabuildasnowball-0.0.1-SNAPSHOT.jar doyouwannabuildasnowball.jar

EXPOSE 8080

CMD ["java","-jar","doyouwannabuildasnowball.jar"]
```

### 2. 프론트엔드 Dockerfile

```bash
# Dockerfile

FROM node:16.16.0 as builder
# root 에 app 폴더를 생성

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

# work dir 에 build 폴더 생성 /app/build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/build /usr/share/nginx/html

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
```

### 3. Jenkinsfile

```bash
pipeline{
    agent any
    environment {
       BACK_CONTAINER_NAME="mylittlesnowball_back_container"
       BACK_NAME = "mylittlesnowball_back"

       FRONT_CONTAINER_NAME="mylittlesnowball_front_container"
       FRONT_NAME = "mylittlesnowball_front"
    }
    stages {
        stage('Clean'){
            steps{
                script {
                    try{
                        sh "docker stop ${BACK_CONTAINER_NAME}"

                        sleep 1
                        sh "docker rm ${BACK_CONTAINER_NAME}"

                        sh "docker stop ${FRONT_CONTAINER_NAME}"
                        sleep 1
                        sh "docker rm ${FRONT_CONTAINER_NAME}"
                    }catch(e){
                        sh 'exit 0'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script{
                    sh "docker build -t ${BACK_NAME} ./backend/."
	                sh "docker build -t ${FRONT_NAME} ./frontend/."

                }
            }
        }

        stage('Deploy'){
            steps {
                sh "docker run -d --name=${BACK_CONTAINER_NAME} -p 8080:8080 ${BACK_NAME}"
                sh "docker run -d --name=${FRONT_CONTAINER_NAME} -p 3000:80 ${FRONT_NAME}"
            }
        }
        stage('Docker run') {
            steps {
                sh "docker image prune --force"
            }
        }
    }
}
```

## 백엔드 application.yml 및 s3

```yaml
server:
  servlet:
    context-path: /api

spring:
  main:
    allow-bean-definition-overriding: true

  servlet:
    multipart:
      enabled: true
      max-file-size: 10MB
      max-request-size: 100MB

  # swagger 설정
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher

  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
      #로컬 환경
#    url: jdbc:mysql://localhost:3306/snowball?useUnicode=true&autoReconnect=true&characterEncoding=utf8&allowMultiQueries=true&serverTimezone=UTC
#    username: ssafy
#    password: ssafy

    # ec2 DB에 연결
    url: jdbc:mysql://k7a601.p.ssafy.io:3306/snowball?useSSL=false&useUnicode=true&autoReconnect=true&characterEncoding=utf8&allowMultiQueries=true&serverTimezone=UTC
    username: ssafy
    password: mylittlesnowball601!

  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        default_batch_fetch_size: 500
        #        show_sql: false
        format_sql: true
        show_sql: true

    open-in-view: false

  data:
    mongodb:

      # ec2 server setting
      username: ssafy
      password: skwkrrnl601!
      host: k7a601.p.ssafy.io
      port: 27017
      database: snowball
      authentication-database: snowball

      # local setting
#      uri: mongodb://localhost:27017/snowball

    web:
      pageable:
        default-per-size: 20
        max-page-size: 2000

  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: 272ae474b08df0caa648c29a2cf58ff2
            client-secret: PE7rGTcwahIX2yHK8ZgYHDnLT6BMUHP3
            redirect-uri: https://mylittlesnowball.com/api/login/oauth2/code/kakao
#            redirect-uri: http://localhost:8080/api/login/oauth2/code/kakao
            authorization-grant-type: authorization_code
            client-authentication-method: POST
            client-name: Kakao
            scope:
              - profile_nickname
              - account_email
              - profile_image
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id

  task:
    scheduling:
      pool:
        size: 10

token:
  # 일단 하루
  expiration_time: 86400000
  secret: secretcode
  refresh-cookie-key: refresh

oauth2:
  # 클라이언트 주소
    authorizedRedirectUri: https://mylittlesnowball.com
#    authorizedRedirectUri: http://localhost:3000

cloud:
  aws:
    credentials:
      accessKey: AKIA3FTVN73LLSOXAIHF
      secretKey: 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
    s3:
      bucket: 601snowball
    region:
      static: ap-northeast-2
    stack:
      auto: false

logging:
  level:
    org.hibernate.SQL: debug
    org:
      springframework:
        data:
          mongodb:
            core:
              MongoTemplate: debug
```
