# Exercise_6

Our HTTP server now sends a JSON response body.

Change the location in the response to "Mars". Run the server and make a request to it with curl using the --verbose flag. What is the value of the Content-Length response header?

> the value of the Content-Length response header is 19 :

➜  curl --verbose localhost:3000/
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.85.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Sat, 25 Feb 2023 08:49:10 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 19
< 
* Connection #0 to host localhost left intact
{"location":"Mars"}%                     
