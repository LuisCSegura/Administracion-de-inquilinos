# Para correr el proyecto seguir los siguientes pasos:
1. Renombrar el archivo .envexample como .env
2. Tener una base de datos vacía y agrgar las credenciales dentro del archivo .env similar a:

        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=tenants
        DB_USERNAME=tenants
        DB_PASSWORD=Sele2014

3. Ejecutar los comandos:

        composer install
        npm install
        npm run dev

4. Correr las migraciones con:

        php artisan migrate


5. Finalmente ejecutar el servidor con:

        php artisan serve

Nota: Las migraciones incluyen 2 usuarios: un administrador cuyas credenciales de ingreso son:

EMAIL: testing@mail.com
PASSWORD: testingAdmin

y un inquilino con las credenciales:

EMAIL: inquilino@mail.com
PASSWORD: testingInquilino
