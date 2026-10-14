tomas@LAPTOP-JK5OEQ3H:/mnt/c/Users/tomas/Onedrive/Escritorio/UAA/Noveno Semestre/Ciberseguridad/React,ldap_JWT/videogames-ldap-jwt-lab$ docker run --rm \
  --network backend_auth-network \
  -v nuclei-templates:/root/nuclei-templates \
  projectdiscovery/nuclei:latest \
  -u http://videogames-frontend:80/ \
  -t /root/nuclei-templates \
  -severity medium,high,critical \
  -ni \
  -duc

                     __     _
   ____  __  _______/ /__  (_)
  / __ \/ / / / ___/ / _ \/ /
 / / / / /_/ / /__/ /  __/ /
/_/ /_/\__,_/\___/_/\___/_/   v3.11.1

                projectdiscovery.io

[ERR] Could not read nuclei-ignore file: open /root/.config/nuclei/.nuclei-ignore: no such file or directory
[ERR] Could not read nuclei-ignore file: open /root/.config/nuclei/.nuclei-ignore: no such file or directory
[INF] Current nuclei version: v3.11.1 (unknown) - remove '-duc' flag to enable update checks
[INF] Current nuclei-templates version:  (unknown) - remove '-duc' flag to enable update checks
[INF] New templates added in latest release: 295
[INF] Templates loaded for current scan: 6640
[INF] Executing 6640 signed templates from projectdiscovery/nuclei-templates
[INF] Targets loaded for current scan: 1
[INF] Templates clustered: 369 (Reduced 312 Requests)
[INF] Skipped videogames-frontend:4040 from target list as found unresponsive permanently: cause="port closed or filtered" address=videogames-frontend:4040 chain="connection refused; got err while executing http://videogames-frontend:4040/jobs/"
[INF] Scan completed in 2m. 0 matches found.
[INF] HTTP connections: 20327 total, 4052 new, 16275 reused (80.1%)