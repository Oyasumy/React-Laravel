## Technical
Thư viện đang sử dụng trong dự án

| Tên | Version | Port |Note |
| ------ | ------ |------ |------ |
| Laravel | v10.2.6 | | |
| PHP | 8.2-fpm-alpine | |v8.2|
| ReactJS |  | |v|
| MySQL | 8.0 | 3306 |  | 
| Nginx | nginx:alpine | 80 | nginx/1.21.1 | 
| REDIS | 6-alpine | 6379 |  |
| WEB |  | 4000 | http://locahost:4000 |
| Node | v20.1.0 | 4000 | 10.1.0 (Node v19.1.0) |
| PhpMyAdmin | latest | 5000 | http://locahost:5000 |
| Database | user: dbuser | pass: P@ssword |dbname: blexapp  |

## Hướng dẫn build dự án bằng docker.

- Git source tại địa chỉ `sudo git clone -b develophttps://gitlab.sonix.vn/icraft/annicam.git`.
- Cấp quyền cho user thực thi bằng `sudo chown -R $USER:$USER /var/www/annicam`
- Vào thư mục dự án `cd blex-app-web` và tạo file env bằng lệnh `cp .env.example .env`
- Build docker cho dự án bằng lệnh `docker-compose up -d` và check kết quả
- Kiểm tra danh sách docker process được build bằng lệnh `docker ps -a`
```
CONTAINER ID   IMAGE                   COMMAND                  CREATED         STATUS                   PORTS                                                  NAMES
574b93fa7cc1   annicam-app             "docker-php-entrypoi…"   5 minutes ago   Up 5 minutes             0.0.0.0:5173->5173/tcp, :::5173->5173/tcp, 9000/tcp    app
5584294b51a6   phpmyadmin/phpmyadmin   "/docker-entrypoint.…"   5 minutes ago   Up 5 minutes             0.0.0.0:5001->80/tcp, :::5001->80/tcp                  phpmyadmin
7ea511501fca   redis:6-alpine          "docker-entrypoint.s…"   5 minutes ago   Up 5 minutes (healthy)   6379/tcp                                               redis
e6327d3e39c8   mysql:8.0               "docker-entrypoint.s…"   5 minutes ago   Up 5 minutes (healthy)   33060/tcp, 0.0.0.0:3307->3306/tcp, :::3307->3306/tcp   db
dbdb9563fbcd   nginx:alpine            "/docker-entrypoint.…"   5 minutes ago   Up 5 minutes (healthy)   0.0.0.0:4000->80/tcp, :::4000->80/tcp                  nginx

```
## Cài đặt dự án
 
- Cài đặt composer và thư viện liên quan của dự án bằng `docker compose exec app composer install` và kiểm tra kết quả
```
 INFO  Discovering packages.  

  laravel/sail ................................................................................................................................ DONE
  laravel/sanctum ............................................................................................................................. DONE
  laravel/tinker .............................................................................................................................. DONE
  nesbot/carbon ............................................................................................................................... DONE
  nunomaduro/collision ........................................................................................................................ DONE
  nunomaduro/termwind ......................................................................................................................... DONE
  spatie/laravel-ignition ..................................................................................................................... DONE
```

- Cài đặt React UI bằng lệnh `docker compose exec app php artisan ui react` 
```
   INFO  React scaffolding installed successfully.  

   WARN  Please run [npm install && npm run dev] to compile your fresh scaffolding.  
```

- Cài đặt React auth bằng lệnh `docker compose exec app php artisan ui react --auth` 
```
   INFO  Authentication scaffolding generated successfully.  

   INFO  React scaffolding installed successfully.  

   WARN  Please run [npm install && npm run dev] to compile your fresh scaffolding.  
```

- Tạo key unique cho dự án bằng lệnh `docker compose exec app php artisan key:generate` 
```
  INFO  Application key set successfully.  
```

- Sau đó clear cached cho dự án bằng `docker compose exec app php artisan optimize`

```
   INFO  Caching the framework bootstrap files.  

  config .................................................................................................................................. 7ms DONE
  routes .................................................................................................................................. 6ms DONE

```

- Tiến hành migrate dữ liệu cho dự án bằng `docker compose exec app php artisan migrate` và kiểm tra kết quả
```
   INFO  Preparing database.  

  Creating migration table ............................................................................................................... 13ms DONE

   INFO  Running migrations.  

  2014_10_12_000000_create_users_table ................................................................................................... 40ms DONE
  2014_10_12_100000_create_password_resets_table ......................................................................................... 17ms DONE
  2016_06_01_000001_create_oauth_auth_codes_table ........................................................................................ 33ms DONE
  2016_06_01_000002_create_oauth_access_tokens_table ..................................................................................... 34ms DONE
  2016_06_01_000003_create_oauth_refresh_tokens_table .................................................................................... 31ms DONE
  2016_06_01_000004_create_oauth_clients_table ........................................................................................... 17ms DONE
  2016_06_01_000005_create_oauth_personal_access_clients_table ........................................................................... 13ms DONE
  2019_08_19_000000_create_failed_jobs_table ............................................................................................. 16ms DONE
  2019_12_14_000001_create_personal_access_tokens_table .................................................................................. 29ms DONE
```

- Cài passport để sử dụng OAuth2 server bằng `docker compose exec app php artisan passport:install` và kết quả
```
Encryption keys generated successfully.
Personal access client created successfully.
Client ID: 1
Client secret: 7pvFq2XRw57mL6VOiBoNapnQtyn11ssc43BOEUrr
Password grant client created successfully.
Client ID: 2
Client secret: LINv7obY5H4L1qZU3ATjnJPH31aoR5ihuzDmTo6o
```

- Chạy `docker compose exec app npm run dev` để start server 

> Chú ý: Khi chạy `npm run dev` mà gặp lỗi không ghể connect đến được Vite thì vào file `vite.config.js` và thêm vào đoạn server bên dưới và sau đó chạy lại run dev để start.
```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react(),
    ],
});
```
> File mẫu tham khảo như bên dưới:
```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        port: 5173,
        host: true,
        hmr: {
            host: 'localhost',
        },
        watch: {
          usePolling: true,
        },
    },
});
```

- Kiểm tra cài đặt thành công bằng URL `http://IP:4000` và hiển thị trang Laravel.

> Chú ý: trường hợp khi chạy báo lỗi `Permission denied ` không thể ghi log vào trong `/var/www/html/storage/logs/laravel.log` thì tiến hành cấp qyền write thư mục bằng lệnh `sudo chmod -R 755 storage` cho thư mục storage và kiểm tra lại.

## (Cách 1) Install php8.1-imagick lib to convert pdf to image with docker
- Chạy lệnh: `docker compose up -d --build`

```
 - Container redis       Running                                                                                   0.0s
 - Container db          Running                                                                                   0.0s
 - Container nginx       Running                                                                                   0.0s
 - Container phpmyadmin  Running                                                                                   0.0s
 - Container app         Started                                                                                   3.6s
```

- Sau đó chạy lệnh: `docker compose exec app composer update`

## (Cách 2) Install php8.1-imagick lib to convert pdf to image with package
- Vào máy server cài đặt thư viện php8.1-imagick bằng lệnh `:~$ sudo apt install php8.1-imagick -y`
- Kiểm tra thư viện `imagick` đã được cài đặt bằng lệnh `:~$ php -m`
- Restart lại php8.1-fpm bằng lệnh `~$ sudo systemctl restart php8.2-fpm;`
- Chỉnh sủa policy để cấp quyền write pdf trong file policy `/etc/ImageMagick-6/policy.xml`
```
~$ sudo nano /etc/ImageMagick-6/policy.xml
Comment những dòng bên dưới:
<!-- disable ghostscript format types -->
  <!--<policy domain="coder" rights="none" pattern="PS" />-->
  <!--<policy domain="coder" rights="none" pattern="PS2" />-->
  <!--<policy domain="coder" rights="none" pattern="PS3" />-->
  <!--<policy domain="coder" rights="none" pattern="EPS" />-->
  <!--<policy domain="coder" rights="none" pattern="PDF" />-->
  <!--<policy domain="coder" rights="none" pattern="XPS" />-->
```
- Khởi động lại php8.2-fpm bằng lệnh `~$ sudo systemctl restart php8.2-fpm;`

## Cài đặt thư viện tạo thumnail từ video
- Chạy trực tiếp trên máy server
  - Cài đặt thư viện bằng: `sudo apt-get install ffmpeg` Check cài đặt version: `ffmpeg -version`
  - Cài đặt thư viện php-ffmpeg/php-ffmpeg bằng: `composer update` 
- Cài đặt nếu chạy bằng docker
  - Cài đặt thư viện vào composer bằng: `docker-compose exec app composer require php-ffmpeg/php-ffmpeg` 
  - Sau đó update composer bằng: `docker-compose exec app composer update`

## phpMyAdmin

- Để sử dụng phpMyAdmin để kiểm tra Database thì truy cập vào địa chỉ `http://IP:5000/` và đăng nhập với user `dbuser` và password `P@ssword`.

