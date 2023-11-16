FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html/

# Copy existing application directory contents
COPY . .

# Install Additional dependencies
# Install dependencies for the operating system software
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    zip \
    vim \
    git \
    curl

# Install extensions for php
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install gd
RUN docker-php-ext-install pcntl

# Install composer (php package manager)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install NPM
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash -
RUN apt-get -y install nodejs
RUN npm i -g npm@10.1.0
#RUN npm i -g npm@latest

#Install imagick and edit policy pdf
#RUN apt-get update; \
#    apt-get install -y libmagickwand-dev; \
#    pecl install imagick; \
#    docker-php-ext-enable imagick;
#RUN sed -i 's/^.*policy.*coder.*none.*PDF.*//' /etc/ImageMagick-6/policy.xml

#Install ffmpeg
#RUN apt-get install -y ffmpeg

# Copy supervisord
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/supervisor.d /etc/supervisor.d
COPY docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/php/local.ini /usr/local/etc/php/conf.d/local.ini

# Use the default production configuration ($PHP_INI_DIR variable already set by the default image)
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Add user for laravel application
RUN usermod -u 1000 www-data

# Copy existing application directory permissions
RUN chown -R www-data:www-data .

# Change current user to www
ENV CURRENT_USER www-data

# Expose port 9000 and start php-fpm server
#EXPOSE 9000
CMD ["php-fpm"]
