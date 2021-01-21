# Git

## create new local repository

1. echo "# org-js" >> README.md
1. git init
1. git add README.md
1. git commit -m "first commit"
1. git remote add origin https://github.com/gonwms/TODO-es6.git
1. git push -u origin master


## Crear en web y clonar a local 
1. Crear repo en github.com
2. $ git clone https://github.com/gonwms/[NOMBRE REPO].git

## push
2. git remote add origin https://github.com/gonwms/[nombre de repo].git
3. git push -u origin master

## Cambiar nombre de directorio
1. En github.com: cambiar nombre de repo en settings
2. En la pc: cambiar pathname en .git/config

## force pull to overwrite local files

1. git fetch --all
1. git reset --hard origin/master
1. git pull origin master

## Trabajar en equipo

1. Hacer **fork** de proyecto de tercero
1. Hacer un **$git clone proyecto** del fork para trabajarlo local 
1. Hacer modificaciones que querramos
1. Hacer un push para actualizarlo en la nube
1. Ir a pestaña **pull request** > crear pull request. 
1. Github first compares the base fork with yours, and will find nothing if you made no changes, so, click **switching the base**, which will change your fork to the base, and the original to the head fork. 
1. confirm merge