## create new repository
echo "# org-js" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/gonwms/TODO-es6.git
git push -u origin master

## Clonar repo (download)
1. Crear repo en github.com
2. $ git clone https://github.com/gonwms/[NOMBRE REPO].git

## or push an existing repository from the command line
2. git remote add origin https://github.com/gonwms/[nombre de repo].git
3. git push -u origin master

## Cambiar nombre de directorio
1. En github.com: cambiar nombre de repo en settings
2. En la pc: cambiar pathname en .git/config