docker build -t app/up_arquivos_csv:1.0 . 
docker rm -f app-running
docker run -d -p 3000:3000 --name app-running app/up_arquivos_csv:1.0


